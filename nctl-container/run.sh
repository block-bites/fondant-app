#!/bin/bash

echo "Today is " `date`

alias casper-client=/home/casper/casper-client-rs/target/release/casper-client
NCTL="/home/casper/casper-node/utils/nctl"
NCTL_CASPER_HOME="/home/casper/casper-node"
NCTL_CASPER_NODE_LAUNCHER_HOME="/home/casper/casper-node-launcher"
NCTL_CASPER_CLIENT_HOME="/home/casper/casper-client-rs"

source /home/casper/casper-node/utils/nctl/activate

nctl-view-node-status
