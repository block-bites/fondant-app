// proxy-api/index.js
const express = require("express");
const Docker = require("dockerode");

const app = express();
const port = 3000;

// Create a new Docker instance
const docker = new Docker();

// Endpoint to start the Casper nodes using Docker
app.post("/start-nodes", async (req, res) => {
  
  //   const { nodeCount, nodeDelay, chainspec } = req.body;

  // Start the Casper nodes using Docker
  try {
    const container = await docker.createContainer({
      Image: "makesoftware/casper-nctl:latest",
      name: "mynctl",
      ExposedPorts: { "11101/tcp": {}, "14101/tcp": {}, "18101/tcp": {} },
      HostConfig: {
        PortBindings: {
          "11101/tcp": [{ HostPort: "11101" }],
          "14101/tcp": [{ HostPort: "14101" }],
          "18101/tcp": [{ HostPort: "18101" }],
        },
      },
    });

    await container.start();

    console.log("Casper nodes started successfully");

    res.json({ message: "Casper nodes started successfully" });
  } catch (error) {
    console.error("Error starting Casper nodes:", error.message);
    res.status(500).json({ error: "Error starting Casper nodes" });
  }
});

app.get("/get-status", async (req, res) => {
  try {
    // Get the myncyl container by name
    const container = docker.getContainer("mynctl");

    const command = "nctl-view-node-status node=1";

    // Create the exec command options
    const execOptions = {
      Cmd: ["bash", "-c", command],
      AttachStdout: true,
      AttachStderr: true,
    };

    // Execute the command inside the container
    const exec = await container.exec(execOptions);

    // Start the exec command
    const stream = await exec.start();
    console.log(stream);

    // Capture the output of the command
    let output = "";
    stream.on("data", (chunk) => {
      console.log(chunk);
      output += chunk.toString("utf8");
    });

    // Wait for the command to complete
    await new Promise((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });
    console.log(output);
    res
      .status(200)
      .json({ message: "Status fetch succesfull", result: output });
  } catch (error) {
    console.error("Error fetching status:", error.message);
    res.status(500).json({ error: "Error fetching status" });
  }
});

app.listen(port, () => {
  console.log(`Node.js Express API listening at http://localhost:${port}`);
});

app.get("/nctl-view-faucet-secret-key", async (req, res) => {
  try {
    // Call the nctl_view_faucet_secret_key command
    const key = (
      await axios.post(
        "http://nctl-container:4000/commands/nctl_view_faucet_secret_key"
      )
    ).data.key;

    // Retrieve the result of the command
    const data = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_view_faucet_secret_key?key=${key}&wait=true`
      )
    ).data;

    // Send the faucet secret key as the response
    res.status(200).send(data.report);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
