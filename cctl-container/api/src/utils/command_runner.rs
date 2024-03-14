use serde_derive::Deserialize;
use std::collections::HashMap;
use std::fs;
use std::process::Command;

#[derive(Deserialize)]
struct Commands {
    commands: HashMap<String, String>,
}

fn run_command(command_input: &str) {
    let json_file_path = "/commands.json"
    let file_contents = fs::read_to_string(json_file_path).expect("Failed to read JSON file");
    let commands: Commands = serde_json::from_str(&file_contents).expect("Failed to parse JSON");

    let mut parts = command_input.split_whitespace();
    let command = parts.next().expect("No command provided");
    let args: Vec<&str> = parts.collect();

    let replaced_args: Vec<String> = args
        .iter()
        .map(|&arg| {
            commands
                .commands
                .get(arg)
                .cloned()
                .unwrap_or_else(|| arg.to_string())
        })
        .collect();

    let output = Command::new(command)
        .args(&replaced_args)
        .output()
        .expect("Failed to execute command");

    println!("Status: {}", output.status);
    println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
    println!("stderr: {}", String::from_utf8_lossy(&output.stderr));
}
