// index.js
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.post('/health-check', (req, res) => {
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

app.post("/status", (req, res) => {

});

// // Add other API endpoints for status, RPC, SSE, etc.

app.listen(port, () => {
  console.log(`Lean Node.js Express API listening at http://localhost:${port}`);
});
