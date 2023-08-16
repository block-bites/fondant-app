// index.js
const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/health-check", (req, res) => {
  res.json({ message: "OK" });
});

// app.post("/start", (req, res) => {
//   const { node, delays, chainspec } = req.body;

//   // Stop the previous NCTL process (if any)
//   if (nctlProcess) {
//     nctlProcess.kill();
//   }

//   // Start the new NCTL process with user-provided parameters
//   nctlProcess = exec(`sh restart.sh`, (error, stdout, stderr) => {
//     if (error) {
//       console.error("Error starting NCTL process:", stderr);
//       res.status(500).json({ error: "Error starting NCTL process" });
//     } else {
//       console.log("NCTL process started:", stdout);
//       res.json({ message: "NCTL process started successfully" });
//     }
//   });
// });

app.post("/nctl-start", async (req, res) => {
  try {
    // Call assets-setup command
    const key = (
      await axios.post("http://nctl-container:4000/commands/nctl_assets_setup")
    ).data.key;
    const data = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_assets_setup?key=${key}&wait=true`
      )
    ).data;

    // Call assets-start command
    const key2 = (
      await axios.post("http://nctl-container:4000/commands/nctl_start")
    ).data.key;
    const data2 = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_start?key=${key2}&wait=true`
      )
    ).data;

    // Call view-node-ports command
    const key3 = (
      await axios.post(
        "http://nctl-container:4000/commands/nctl_view_node_ports"
      )
    ).data.key;
    const data3 = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_view_node_ports?key=${key3}&wait=true`
      )
    ).data;
    res.status(200).send(parseResponse(data3.report));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

function parseResponse(response) {
  const lines = response.split("\n");
  const data = {};

  for (const line of lines) {
    const match = line.match(
      /NCTL :: (node-\d+) :: VNET @ (\d+) :: RPC @ (\d+) :: REST @ (\d+) :: SSE @ (\d+) :: SPECULATIVE_EXEC @ (\d+)/
    );
    if (match) {
      const [, node, vnet, rpc, rest, sse, speculativeExec] = match;
      data[node] = {
        VNET: Number(vnet),
        RPC: Number(rpc),
        REST: Number(rest),
        SSE: Number(sse),
        SPECULATIVE_EXEC: Number(speculativeExec),
      };
    }
  }

  return data;
}

app.post("/nctl-status", async (req, res) => {
  try {
    // Call nctl-status command
    const key = (
      await axios.post("http://nctl-container:4000/commands/nctl_status")
    ).data.key;
    const data = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_status?key=${key}&wait=true`
      )
    ).data;
    if (data.report.includes("RUNNING")) {
      res.status(200).send(data.report);
    } else {
      res.status(503).send("Service Unavailable");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/nctl-view-faucet", async (req, res) => {
  try {
    // Call nctl-status command
    const key = (
      await axios.post(
        "http://nctl-container:4000/commands/nctl_view_faucet_account"
      )
    ).data.key;
    const data = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_view_faucet_account?key=${key}&wait=true`
      )
    ).data;
    res.status(200).send(data.report);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// // Add other API endpoints for status, RPC, SSE, etc.

app.listen(port, () => {
  console.log(`Lean Node.js Express API listening at http://localhost:${port}`);
});
