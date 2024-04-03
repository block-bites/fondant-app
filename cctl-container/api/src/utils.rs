use serde::Serialize;
use std::collections::HashMap;
use std::fs;
use std::process::{Command, Output};
use regex::Regex;
use std::str;
use std::fs::File;
use std::io::Write;

#[derive(Serialize, Debug)]
pub struct CommandResult {
    pub status: String,
    pub stdout: String,
    pub stderr: String,
}

pub fn process_output(output: Output) -> Result<CommandResult, String> {
    if output.status.success() {
        Ok(CommandResult {
            status: "success".to_string(),
            stdout: String::from_utf8_lossy(&output.stdout).to_string(),
            stderr: String::from_utf8_lossy(&output.stderr).to_string(),
        })
    } else {
        Err(format!(
            "Command failed with status: {}\nStdout: {}\nStderr: {}",
            output.status,
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        ))
    }
}

pub fn run_command(command: &str, args: Option<Vec<String>>) -> Result<CommandResult, String> {
    let json_file_path = "commands.json";
    let file_contents = fs::read_to_string(json_file_path)
        .map_err(|e| format!("Failed to read JSON file: {}", e))?;
    let command_map: HashMap<String, String> = serde_json::from_str(&file_contents)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;
    let mut final_command = command_map
        .get(command)
        .ok_or_else(|| format!("Command not found: {}", command))?
        .clone();

    if let Some(ref args_vec) = args {
        final_command = format!("{} {}", final_command, args_vec.join(" "));
    }

    println!("Running command: {}", final_command);

    let output = Command::new("bash")
        .arg("-c")
        .arg(&final_command)
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    process_output(output)
}

pub fn parse_node_ports() -> HashMap<String, HashMap<String, i32>> {
    let command_output = run_command("cctl-infra-node-view-ports", None).unwrap();
    let stdout = command_output.stdout;

    let line_regex = Regex::new(r"node-\d+ -> .*").unwrap();
    let port_regex = Regex::new(r"node-(\d+) -> CONSENSUS @ (\d+) :: RPC @ (\d+) :: REST @ (\d+) :: SSE @ (\d+) :: SPECULATIVE_EXEC @ (\d+)").unwrap();

    let mut node_service_ports = HashMap::new();

    for line in stdout.lines() {
        if line_regex.is_match(line) {
            for cap in port_regex.captures_iter(line) {
                let node_name = format!("node-{}", &cap[1]);
                let services = vec![
                    ("CONSENSUS".to_string(), cap[2].parse::<i32>().unwrap()),
                    ("RPC".to_string(), cap[3].parse::<i32>().unwrap()),
                    ("REST".to_string(), cap[4].parse::<i32>().unwrap()),
                    ("SSE".to_string(), cap[5].parse::<i32>().unwrap()),
                ];
                node_service_ports.insert(node_name, services.into_iter().collect());
            }
        }
    }


    node_service_ports
}   

pub fn generate_nginx_config(node_service_ports: &HashMap<String, HashMap<String, i32>>) {
    let mut config = String::from("events {\n worker_connections 1024;\n}\n http {\n server {\n listen 80;\n server_name localhost;\n\n");

    for (node_name, services) in node_service_ports {
        for (service_name, port) in services {
            let location_block = format!(" location /{}/{}/ {{
                proxy_pass http://localhost:{}/;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                
                # Add CORS headers
                add_header 'Access-Control-Allow-Origin' '*' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
                
                if ($request_method = 'OPTIONS') {{
                    add_header 'Access-Control-Max-Age' 1728000;
                    add_header 'Content-Type' 'text/plain; charset=utf-8';
                    add_header 'Content-Length' 0;
                    return 204;
                }}
            }}\n\n", node_name, service_name.to_lowercase(), port);

            config.push_str(&location_block);
        }
    }

    config.push_str(" }\n}");

    let mut file = File::create("/etc/nginx/nginx.conf").unwrap();
    file.write_all(config.as_bytes()).unwrap();
}

pub fn start_nginx() {
    let start_output = Command::new("service")
            .arg("nginx")
            .arg("start")
            .output()
            .expect("Failed to start Nginx");

    if !start_output.status.success() {
        eprintln!("Failed to start Nginx: {}", String::from_utf8_lossy(&start_output.stderr));
    }
}

pub fn read_file(file_path: &str) -> Result<String, String> {
    fs::read_to_string(file_path).map_err(|e| format!("Failed to read file: {}", e))   
}
