#[macro_use] extern crate rocket;

use rocket::http::Status;
use rocket::serde::{Serialize, json::Json};

mod utils;
mod cache;

//use cache::SseCache;

#[derive(Serialize)]
struct ActivationResponse {
    success: bool,
    message: String,
}

#[get("/health")]
fn health() -> &'static str {
    "Service is up and running"
}

#[post("/run/<command>?<args..>")]
fn run(command: String, args: Option<Vec<String>>) -> Result<Json<utils::CommandResult>, Status> {
    match utils::run_command(&command, args) {
        Ok(result) => Ok(Json(result)),
        Err(error) => {
            eprintln!("Command execution error: {}", error);
            Err(Status::InternalServerError)
        }
    }
}



#[post("/launch")]
fn launch() -> Result<Json<ActivationResponse>, Status> {
    let mut command = "cctl-infra-net-setup";
    utils::run_command(&command, None);
    command = "cctl-infra-net-start";
    utils::run_command(&command, None);

    let parsed_ports = utils::parse_node_ports();
    println!("{:?}", parsed_ports);

    utils::generate_nginx_config(&parsed_ports);
    utils::start_nginx();
    

    Ok(Json(ActivationResponse {
        success: true,
        message: "Network launched successfully".to_string(),
    }))
}


#[launch]
fn rocket() -> _ {
    
    rocket::build()
        .mount("/", routes![health, run, launch])
        .configure(rocket::Config {
            address: "0.0.0.0".parse().unwrap(),
            port: 3001,
            ..rocket::Config::default()
        })
}