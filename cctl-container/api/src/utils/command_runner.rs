use serde_derive::Serialize;
use serde_json;
use std::collections::HashMap;
use std::fs;
use std::process::{Command, Output};
use std::str;

#[derive(Serialize)]
struct CommandResult {
    status: String,
    stdout: String,
    stderr: String,
}


fn run_command(command_input: &str) -> String {
    let json_file_path = "commands.json";
    let file_contents = fs::read_to_string(json_file_path).expect("Failed to read JSON file");
    let commands: HashMap<String, String> =
        serde_json::from_str(&file_contents).expect("Failed to parse JSON");

    let mut parts = command_input.split_whitespace();
    let command = parts.next().expect("No command provided");
    let args: Vec<&str> = parts.collect();

    let replaced_args: Vec<String> = args
        .iter()
        .map(|&arg| commands.get(arg).cloned().unwrap_or_else(|| arg.to_string()))
        .collect();

    let output = Command::new(command)
        .args(&replaced_args)
        .output()
        .expect("Failed to execute command");

    let command_result = process_output(output);

    serde_json::to_string(&command_result).expect("Failed to serialize command result")
}

fn process_output(output: Output) -> CommandResult {
    CommandResult {
        status: match output.status.success() {
            true => "success".to_string(),
            false => format!("error {}", output.status),
        },
        stdout: String::from_utf8_lossy(&output.stdout).to_string(),
        stderr: String::from_utf8_lossy(&output.stderr).to_string(),
    }
}