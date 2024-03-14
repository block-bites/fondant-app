#[macro_use] extern crate rocket;

use std::process::Command;
use rocket::http::Status;
use rocket::serde::{Serialize, json::Json};

#[derive(Serialize)]
struct ActivationResponse {
    success: bool,
    message: String,
}

// Define the health check route
#[get("/health")]
fn health() -> &'static str {
    "Service is up and running"
}

#[get("/activate")]
fn activate() -> Result<Json<ActivationResponse>, Status> {
    match Command::new("/app/cctl/activate.sh").output() {
        Ok(output) => {
            if output.status.success() {
                Ok(Json(ActivationResponse {
                    success: true,
                    message: "Activation script executed successfully.".to_string(),
                }))
            } else {
                Err(Status::InternalServerError)
            }
        },
        Err(_) => Err(Status::InternalServerError),
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![activate, health])
        .configure(rocket::Config {
            port: 3001,
            ..rocket::Config::default()
        })
}
