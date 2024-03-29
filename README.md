# Fondant: A Blockchain Application Suite
## Current Status

Welcome to the Fondant app, version 1.0! This guide will walk you through setting up both the frontend and backend components. Get ready to explore and test the capabilities of this blockchain application.

## Prerequisites:

You will need **docker** installed and running on your machine for this application to work.


## Running the Application:

Paste this command into your terminal 
    ```curl -sL https://raw.githubusercontent.com/block-bites/fondant-app/master/setup/docker-compose.yml | docker-compose -f - up```

In case of a docker-compose error try ```sudo docker-compose -f - up``` instead

Or:

1. **Clone the repo**.
2. **Script Selection:** Choose the appropriate script for your operating system (Windows or Linux) and execute it.
3. **Initialization** Feedback: Monitor the initial output from nctl (Note: This feedback mechanism will be updated in future releases).
4. **Launch:** Once the setup is complete, your Fondant app is ready for use!

## Frontend Features

Explore the user-friendly interface of Fondant's frontend:

- **Accounts Page:** This section displays all user accounts, complete with their private and public keys.
- **Blocks Section:** View all blockchain blocks arranged in chronological order.
- **Deploys, Events, Logs:** Access detailed information about deploys, events, and logs for in-depth analysis. 

If you don't want to use any tools but want to see how deploy data looks like you can use `http://localhost:3000/transfer` endpoint. It will transfer some funds from the faucet account and generate some traffic.

## Backend Capabilities

We've set up proxies for essential ports as backend endpoints. *Example: http://localhost:3001/net/1/rpc*. These endpoints allow direct connection to the respective node's RPC port.
Sample Commands:
- To check the status of node 1: 
    `casper-client get-node-status -n http://localhost:3001/net/1/rpc`
- To retrieve the latest block info from node 2:
    `casper-client get-block -n http://localhost:3001/net/2/rpc`
- To get the current state root hash from node 3:
    `casper-client get-state-root-hash -n http://localhost:3001/net/3/rpc` (applicable after the first block emission)

Currently, nodes 1 to 5 are supported, with plans to make this configurable in future updates.

### Endpoint Documentation:

For comprehensive information on all available endpoints, refer to the OpenAPI.yml file included in the package
