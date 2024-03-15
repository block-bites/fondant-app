#[macro_use] extern crate rocket;

use rocket::http::Status;
use rocket::serde::{Serialize, json::Json};

mod utils;

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

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![health, run])
        .configure(rocket::Config {
            address: "0.0.0.0".parse().unwrap(),
            port: 3001,
            ..rocket::Config::default()
        })
}