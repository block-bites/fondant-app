use serde_derive::Serialize;
use std::process::{Command, Output};
use std::collections::HashMap;
use std::fs;

#[derive(Serialize)]
pub struct CommandResult {
    pub status: String,
    pub stdout: String,
    pub stderr: String,
}

pub fn run_command(command: &str, args: Option<Vec<String>>) -> Result<CommandResult, String> {
    let json_file_path = "commands.json";
    let file_contents = fs::read_to_string(json_file_path).expect("Failed to read JSON file");
    let command_map: HashMap<String, String> = serde_json::from_str(&file_contents).expect("Failed to parse JSON");

    let command_path = command_map.get(command).ok_or_else(|| format!("Command not found: {}", command))?;

    let mut command_args = Vec::new();
    if let Some(args) = args {
        command_args = args;
    }

    let output = Command::new(command_path)
        .args(&command_args)
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    Ok(process_output(output))
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