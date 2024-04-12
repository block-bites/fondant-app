
#[macro_use] extern crate rocket;

use rocket::{get, launch, routes};
use rocket::http::Status;
use rocket::serde::{Serialize, json::Json};

// Multithreading safety
use lazy_static::lazy_static;
use std::sync::Mutex;

//For CORS
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

// Filesystem for key reading.
use std::fs;

mod cache;
mod utils;

pub struct CORS;

#[derive(Serialize)]
struct ActivationResponse {
    success: bool,
    message: String,
}

lazy_static! {
    static ref CACHE: Mutex<cache::SseCache> = Mutex::new(cache::SseCache::new(1000));
    static ref NETWORK_STATUS: Mutex<String> = Mutex::new("".to_string());
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

// Init does not replace start, It is used to setup the netowrk, reverse proxy and sse caching.
#[post("/init")]
fn init() -> Result<Json<ActivationResponse>, Status> {
    let mut status = NETWORK_STATUS.lock().unwrap();
    *status = "launching".to_string();

    match utils::run_command("cctl-infra-net-setup", None) {
        Ok(_) => {
            *status = "launched".to_string();
        }
        Err(_) => {
            *status = "stopped".to_string();
        }
    }

    match utils::run_command("cctl-infra-net-start", None) {
        Ok(_) => {
            *status = "running".to_string();
        }
        Err(_) => {
            *status = "stopped".to_string();
        }
    }


    let parsed_ports = utils::parse_node_ports();
    println!("{:?}", parsed_ports);

    utils::generate_nginx_config(&parsed_ports);
    utils::start_nginx();

    let node_count = utils::count_running_nodes();
    println!("{} nodes running.", node_count);

    for i in 1..node_count + 1{
        let events = format!("http://localhost/node-{}/sse/events/main", i);
        CACHE.lock().unwrap().start_listening(events);

        let deploys = format!("http://localhost/node-{}/sse/events/deploys", i);
        CACHE.lock().unwrap().start_listening(deploys);
    }
    
    *status = "running".to_string();
    Ok(Json(ActivationResponse {
        success: true,
        message: "Network is initilized and started.".to_string(),
    }))
}

#[post("/stop")]
fn stop() -> Result<Json<ActivationResponse>, Status> {
    let mut status = NETWORK_STATUS.lock().unwrap();
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
fn start() -> Result<Json<ActivationResponse>, (Status, &'static str)> {
    let mut status = NETWORK_STATUS.lock().unwrap();
    if *status == "" {
        return Err((Status::BadRequest, "You need to initialize the network before you can start it"));
    }
    if *status == "running" {
        return Err((Status::Conflict, "The network is already running"));
    }
    if *status == "starting" {
        return Err((Status::Conflict, "The network is already starting"));
    }
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
            Err((Status::InternalServerError, "Failed to start the network"))
        }
    }
}

#[get("/status")]
fn status() -> Json<ActivationResponse> {
    let status = NETWORK_STATUS.lock().unwrap();
    Json(ActivationResponse {
        success: true,
        message: status.clone(),
    })
}

#[get("/cache/events/<node_number>")]
fn get_events(node_number: i32) -> Option<Json<Vec<String>>> {
    let event_url = format!("http://localhost/node-{}/sse/events/main", node_number);
    let events = CACHE.lock().unwrap().get_data(&event_url).map(Json);
    events.map(|events| Json(events.0[1..].to_vec()))
}

#[get("/cache/deploys/<node_number>")]
fn get_deploys(node_number: i32) -> Option<Json<Vec<String>>> {
    let event_url = format!("http://localhost/node-{}/sse/events/main", node_number);
    let events = CACHE.lock().unwrap().get_data(&event_url).map(Json);
    //if string contains "Deploy" then add to the return list
    let deploys = events.map(|events| {
        let deploys: Vec<String> = events.0[1..].iter().filter(|event| event.contains("Deploy")).cloned().collect();
        Json(deploys)
    });
    deploys
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

#[get("/users/<user_id>/private_key")]
fn get_private_key(user_id: i32) -> Result<Json<ActivationResponse>, Status> {
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

#[get("/node_count")]
fn node_count() -> Json<ActivationResponse> {
    let node_count = utils::count_running_nodes();
    Json(ActivationResponse {
        success: true,
        message: format!("There are {} nodes running", node_count),
    })
}



#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
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
        .mount("/", routes![run, init, status, get_private_key, get_public_key, stop, start, get_events, get_deploys, search_events, search_deploys, node_count])
        .configure(rocket::Config {
            address: "0.0.0.0".parse().unwrap(),
            port: 3001,
            ..rocket::Config::default()
        })
}
