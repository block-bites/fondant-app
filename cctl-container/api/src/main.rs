#[macro_use] extern crate rocket;

use rocket::http::Status;
use rocket::serde::{Serialize, json::Json};
use std::fs;

mod utils;
mod cache;

use lazy_static::lazy_static;
use std::sync::Mutex;

use cache::SseCache;

use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

pub struct CORS;

//TODO: Flexible capacity
lazy_static! {
    static ref CACHE: Mutex<SseCache> = Mutex::new(SseCache::new(1000));
    static ref STATUS: Mutex<String> = Mutex::new("".to_string());
}

fn listen_to_sse(node_count: i32) {
    for i in 1..node_count + 1{
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

#[get("/cache/events/<node_number>/search?<query>")]
fn search_events(node_number: i32, query: &str) -> Option<Json<Vec<String>>> {
    let events = format!("http://localhost/node-{}/sse/events/main", node_number);
    CACHE.lock().unwrap().search(&events, query).map(Json)
}

#[get("/cache/deploys/<node_number>/search?<query>")]
fn search_deploys(node_number: i32, query: &str) -> Option<Json<Vec<String>>> {
    let deploys = format!("http://localhost/node-{}/sse/events/deploys", node_number);
    CACHE.lock().unwrap().search(&deploys, query).map(Json)
}


#[post("/launch")]
fn launch() -> Result<Json<ActivationResponse>, Status> {
    let mut status = STATUS.lock().unwrap();
    *status = "launching".to_string();
    utils::run_command("cctl-infra-net-setup", None);
    utils::run_command("cctl-infra-net-start", None);

    let parsed_ports = utils::parse_node_ports();
    println!("{:?}", parsed_ports);

    utils::generate_nginx_config(&parsed_ports);
    utils::start_nginx();

    listen_to_sse(5);
    
    *status = "running".to_string();
    Ok(Json(ActivationResponse {
        success: true,
        message: "Network launched successfully".to_string(),
    }))
}

#[post("/stop")]
fn stop() -> Result<Json<ActivationResponse>, Status> {
    let mut status = STATUS.lock().unwrap();
    *status = "stopping".to_string();

    match utils::run_command("cctl-infra-net-stop", None) {
        Ok(_) => {
            *status = "stopped".to_string();
            Ok(Json(ActivationResponse {
                success: true,
                message: "Network stopped successfully".to_string(),
            }))
        }
        Err(_) => {
            *status = "stopped".to_string();
            Err(Status::InternalServerError)
        }
    }
}

#[post("/start")]
fn start() -> Result<Json<ActivationResponse>, Status> {
    let mut status = STATUS.lock().unwrap();
    *status = "starting".to_string();

    match utils::run_command("cctl-infra-net-start", None) {
        Ok(_) => {
            *status = "running".to_string();
            Ok(Json(ActivationResponse {
                success: true,
                message: "Network started successfully".to_string(),
            }))
        }
        Err(_) => {
            *status = "stopped".to_string();
            Err(Status::InternalServerError)
        }
    }
}

#[get("/status")]
fn status() -> Json<ActivationResponse> {
    let status = STATUS.lock().unwrap();
    Json(ActivationResponse {
        success: true,
        message: status.clone(),
    })
}


#[get("/users/<user_id>/secret_key")]
fn get_secret_key(user_id: i32) -> Result<Json<ActivationResponse>, Status> {
    let secret_key_path = format!("/home/cctl/cctl/assets/users/user-{}/secret_key.pem", user_id);

    match fs::read_to_string(&secret_key_path) {
        Ok(secret_key) => Ok(Json(ActivationResponse {
            success: true,
            message: secret_key,
        })),
        Err(error) => {
            if error.kind() == std::io::ErrorKind::NotFound {
                Err(Status::NotFound)
            } else {
                Err(Status::InternalServerError)
            }
        }
    }
}


#[get("/users/<user_id>/public_key")]
fn get_public_key(user_id: i32) -> Result<Json<ActivationResponse>, Status> {
    let public_key_path = format!("/home/cctl/cctl/assets/users/user-{}/public_key.pem", user_id);

    match fs::read_to_string(&public_key_path) {
        Ok(public_key) => Ok(Json(ActivationResponse {
            success: true,
            message: public_key,
        })),
        Err(error) => {
            if error.kind() == std::io::ErrorKind::NotFound {
                Err(Status::NotFound)
            } else {
                Err(Status::InternalServerError)
            }
        }
    }
}




#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
       }
    }


    async fn on_response<'r>(&self, req: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}


#[launch]
fn rocket() -> _ {
    
    rocket::build()
        .attach(CORS)
        .mount("/", routes![health, run, launch, get_events, get_deploys, search_events, search_deploys, stop, start, status, get_secret_key, get_public_key])
        .configure(rocket::Config {
            address: "0.0.0.0".parse().unwrap(),
            port: 3001,
            ..rocket::Config::default()
        })
}