# Fondant: A Blockchain Application Suite

Welcome to Fondant version 1.1! Fondant is a suite of tools the purpose of which is to help you develop and test your applications on the Casper blokchain. We provide all the functionality of CCTL packaged in a slick UI. The app runs on docker containers so you don't have to wander about cross-compatibility or demanding compilations.

To get started install **docker** and run  
```curl -sL https://raw.githubusercontent.com/block-bites/fondant-app/master/setup/docker-compose.yml | docker-compose -f - up```


In case of a docker-compose error try ```sudo docker-compose -f - up``` instead

### Want to add something to fondant?

You can clone this repository and build the docker-compose file that's inside root folder, or use one of our setup scripts.

## Frontend Features

Explore the user-friendly interface of Fondant's frontend:

- **Accounts Page:** This section displays all user accounts, complete with their private and public keys.
- **Blocks Section:** View all blockchain blocks arranged in chronological order.
- **Deploys, Events, Logs:** Access detailed information about deploys, events, and logs for in-depth analysis. 

## Backend Capabilities

We've set up proxies for essential ports as backend endpoints. *Example: http://localhost/node-1/rpc*. These endpoints allow direct connection to the respective node's RPC port.
Sample Commands:
- To check the status of node 1: 
    `casper-client get-node-status -n http://localhost/node-1/rpc`
- To retrieve the latest block info from node 2:
    `casper-client get-block -n http://localhost/node-1/rpc`
- To get the current state root hash from node 3:
    `casper-client get-state-root-hash -n http://localhost/node-1/rpc` (applicable after the first block emission)

Currently, nodes 1 to 5 are supported, with plans to make this configurable in future updates.
