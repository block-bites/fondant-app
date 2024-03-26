#[macro_use] extern crate rocket;

use rocket::http::Status;
use rocket::serde::{Serialize, json::Json};

mod utils;
mod cache;

use lazy_static::lazy_static;
use std::sync::Mutex;

use cache::SseCache;

lazy_static! {
    static ref CACHE: Mutex<SseCache> = Mutex::new(SseCache::new(100));
}

fn listen_to_sse(node_count: i32) {
    for i in 0..node_count {
        let events = format!("http://localhost/node-{}/sse/events/main", i);
        CACHE.lock().unwrap().start_listening(events);

        let deploys = format!("http://localhost/node-{}/sse/events/deploys", i);
        CACHE.lock().unwrap().start_listening(deploys);
    }
}

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

#[get("/cache/events/<node_number>")]
fn get_events(node_number: i32) -> Option<Json<Vec<String>>> {
    let events = format!("http://localhost/node-{}/sse/events/main", node_number);
    CACHE.lock().unwrap().get_data(&events).map(Json)
}

#[get("/cache/deploys/<node_number>")]
fn get_deploys(node_number: i32) -> Option<Json<Vec<String>>> {
    let deploys = format!("http://localhost/node-{}/sse/events/deploys", node_number);
    CACHE.lock().unwrap().get_data(&deploys).map(Json)
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

    listen_to_sse(parsed_ports.len() as i32);
    

    Ok(Json(ActivationResponse {
        success: true,
        message: "Network launched successfully".to_string(),
    }))
}


#[launch]
fn rocket() -> _ {
    
    rocket::build()
        .mount("/", routes![health, run, launch, get_events, get_deploys])
        .configure(rocket::Config {
            address: "0.0.0.0".parse().unwrap(),
            port: 3001,
            ..rocket::Config::default()
        })
}