// // index.js
// const express = require("express");
// const { exec } = require("child_process");

// const app = express();
// const port = 3000;

// let nctlProcess;

// app.use(express.json());

// app.post('/start-nodes', (req, res) => {
//   const { nodeCount, nodeDelay } = req.body;

//   // Execute the 'nctl start' command using the 'exec' function
//   const command = `docker run --rm -it --name mynctl -d -p 11101:11101 -p 14101:14101 -p 18101:18101 makesoftware/casper-nctl`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error('Error starting Casper nodes:', stderr);
//       res.status(500).json({ error: 'Error starting Casper nodes' });
//     } else {
//       console.log('Casper nodes started:', stdout);
//       res.json({ message: 'Casper nodes started successfully' });
//     }
//   });
// });

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

// app.post("/stop", (req, res) => {
//   const { saveConfig } = req.body;

//   // Stop the NCTL process
//   if (nctlProcess) {
//     nctlProcess.kill();
//   }

//   // Optionally save the configuration (handle as needed)

//   res.json({ message: "NCTL process stopped successfully" });
// });

// // Add other API endpoints for status, RPC, SSE, etc.

// app.listen(port, () => {
//   console.log(`Lean Node.js Express API listening at http://localhost:${port}`);
// });
