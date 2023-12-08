// index.js
const express = require("express");
const axios = require("axios");
const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");
const { CasperServiceByJsonRPC, CLPublicKey } = require('casper-js-sdk');

const sseCache = require('./sseCache');
const app = express();
app.setMaxListeners(0);
const port = 3000;
let ssePorts = []; // If anyone has a better idea for this please let me know ~Karol

const nodeCount = 10;

const rpcChannels = [];

app.use(express.json());
const cache = new sseCache();



app.post("/health-check", (req, res) => {
  res.json({ message: "OK" });
});

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
    const parsedResponse = parseResponse(data3.report);
    res.status(200).send(parsedResponse);

    cacheAllNodes(parsedResponse);
    setupRPC();

    //Create proxy Middlewares
    const middlewares = createProxyMiddlewares(parsedResponse);
    //Add middlewares to the app
    for (const middleware of middlewares) {
      app.use(middleware);
    }


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


function createProxyMiddlewares(response) {
  const middlewares = [];
  for (const node in response) {
    const ports = response[node];
    for (const portType in ports) {
      const port = ports[portType];

      const pathPrefix = `/net/${node.split("-")[1]}/${portType.toLowerCase()}`;
      const pathRewrite = {
        [`^${pathPrefix}`]: "",
      };

      if (portType.toLowerCase() === "rpc") {
        pathRewrite[`^${pathPrefix}`] = "rpc";
      }

      const middleware = createProxyMiddleware(pathPrefix, {
        target: `http://nctl-container:${port}/`,
        changeOrigin: true,
        pathRewrite,
        onProxyReq: fixRequestBody,
      });

      middlewares.push(middleware);
    }
  }
  return middlewares;
}

function cacheAllNodes(parsedResponse){
  for (const node in parsedResponse) {
    const ports = parsedResponse[node];
    const port = ports['SSE'];
    ssePorts.push(port);
    const streamUrl = `http://nctl-container:${port}/events/main`;
    cache.startListening(streamUrl);
  }
}

function setupRPC(){
  for (let i = 1; i <= nodeCount; i++) {
    const casperService = new CasperServiceByJsonRPC(`http://localhost:3000/net/${i}/rpc`);
    rpcChannels.push(casperService);
  }
}



app.get('cache/events/:nodeNumber', (req, res) => {
  let number = req.params.nodeNumber;
  const streamUrl = `http://nctl-container:${ssePorts[number]}/events/main`;
  const events = cache.getEvents(streamUrl);
  res.send(events);
});


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

app.get("/nctl-view-faucet", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Lean Node.js Express API listening at http://localhost:${port}`);
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

app.get("/nctl-view-user-account", async (req, res) => {
  try {
    const key = (
      await axios.post(
        "http://nctl-container:4000/commands/nctl_view_user_account?user=1"
      )
    ).data.key;
    const data = (
      await axios.get(
        `http://nctl-container:4000/commands/nctl_view_user_account?key=${key}&wait=true`
      )
    ).data;
    res.status(200).send(data.report);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.get('/user-keys/:userNumber', async (req, res) => {
  const userNumber = req.params.userNumber;

  const flask_endpoint = `http://nctl-container:4000/print_file`;
  const private_key_path = `/home/casper/casper-node/utils/nctl/assets/net-1/users/user-${userNumber}/secret_key.pem`;
  const public_key_path = `/home/casper/casper-node/utils/nctl/assets/net-1/users/user-${userNumber}/public_key.pem`;

  const keyRegex = /-----BEGIN PRIVATE KEY-----\n([\s\S]*?)\n-----END PRIVATE KEY-----/;
  const publicKeyRegex = /-----BEGIN PUBLIC KEY-----\n([\s\S]*?)\n-----END PUBLIC KEY-----/; 

  try {
      const response_private = await axios.get(flask_endpoint, { params: { path: private_key_path} });
      const response_public = await axios.get(flask_endpoint, { params: { path: public_key_path } });

      const privateMatch = keyRegex.exec(response_private.data.content);
      const publicMatch = publicKeyRegex.exec(response_public.data.content);

      const final_response = {
          private_key: privateMatch ? privateMatch[1] : null,
          public_key: publicMatch ? publicMatch[1] : null
      }

      res.send(final_response);
  } catch (error) {
      res.status(500).send('Error fetching the file: ' + error);
  }
});



app.get('/block-info/:nodeNumber', async (req, res) => {
  
  const casperService = rpcChannels[req.params.nodeNumber - 1];
  
  try {
    const latestBlockInfo = await casperService.getLatestBlockInfo();
    const block = latestBlockInfo.block;
    const header = block.header;
    const body = block.body;

    const blockHeight = header.height;
    const era = header.era_id;
    const deploys = body.deploy_hashes;
    const blockHash = block.hash;
    const timestamp = header.timestamp;

    const age = new Date() - new Date(timestamp);

    const response = {
      BlockHeight: blockHeight,
      Era: era,
      Deploys: deploys.length,
      Age: age,
      BlockHash: blockHash
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching block info');
  }
});


