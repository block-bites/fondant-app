use serde::Serialize;
use std::collections::HashMap;
use std::fs;
use std::process::{Command, Output};
use regex::Regex;
use std::str;

#[derive(Serialize, Debug)]
pub struct CommandResult {
    pub status: String,
    pub stdout: String,
    pub stderr: String,
}

pub fn run_command(command: &str, args: Option<Vec<String>>) -> Result<CommandResult, String> {
    let json_file_path = "commands.json";
    let file_contents = fs::read_to_string(json_file_path)
        .map_err(|e| format!("Failed to read JSON file: {}", e))?;
    
    let command_map: HashMap<String, String> = serde_json::from_str(&file_contents)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    let final_command = command_map.get(command)
        .ok_or_else(|| format!("Command not found: {}", command))?;

    let output = Command::new("bash")
        .arg("-c")
        .arg(&final_command)
        .args(args.unwrap_or_default())
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    Ok(process_output(output))
}

pub fn process_output(output: Output) -> CommandResult {
    CommandResult {
        status: match output.status.success() {
            true => "success".to_string(),
            false => format!("error {}", output.status),
        },
        stdout: String::from_utf8_lossy(&output.stdout).to_string(),
        stderr: String::from_utf8_lossy(&output.stderr).to_string(),
    }
}

pub fn parse_node_ports(){
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
                    ("CONSENSUS", cap[2].parse::<i32>().unwrap()),
                    ("RPC", cap[3].parse::<i32>().unwrap()),
                    ("REST", cap[4].parse::<i32>().unwrap()),
                    ("SSE", cap[5].parse::<i32>().unwrap()),
                ];

                node_service_ports.insert(node_name, services.into_iter().collect::<HashMap<_, _>>());
            }
        }
    }

    for (node, services) in node_service_ports.iter() {
        println!("{}: {:?}", node, services);
    }
}

    