#!/bin/bash

## Get path to chainspec and config files from ENV variables or use the default ones
##
PATH_TO_CHAINSPEC=${PATH_TO_CHAINSPEC:-"${NCTL_CASPER_HOME}/resources/local/chainspec.toml.in"}
PATH_TO_CONFIG_TOML=${PATH_TO_CONFIG_TOML:-"${NCTL_CASPER_HOME}/resources/local/config.toml"}

## Change minimun/maximum round exponents settings in the chainspec if defined in ENV variables
##
[[ $MINIMUM_ROUND_EXPONENT != "" ]] && sed -E "s/^(minimum_round_exponent = ).+$/\1 $MINIMUM_ROUND_EXPONENT/" $PATH_TO_CHAINSPEC > $PATH_TO_CHAINSPEC.min && PATH_TO_CHAINSPEC=$PATH_TO_CHAINSPEC.min
[[ $MAXIMUM_ROUND_EXPONENT != "" ]] && sed -E "s/^(maximum_round_exponent = ).+$/\1 $MAXIMUM_ROUND_EXPONENT/" $PATH_TO_CHAINSPEC > $PATH_TO_CHAINSPEC.max && PATH_TO_CHAINSPEC=$PATH_TO_CHAINSPEC.max

## Change deploy_delay setting in the nodes config.toml file if defined in ENV variables
##
[[ $DEPLOY_DELAY != "" ]] && sed -E "s/^#?(deploy_delay = ).+$/\1 '$DEPLOY_DELAY'/" $PATH_TO_CONFIG_TOML > $PATH_TO_CONFIG_TOML.mod && PATH_TO_CONFIG_TOML=$PATH_TO_CONFIG_TOML.mod

alias casper-client=/home/casper/casper-client-rs/target/release/casper-client
source $NCTL/activate
source $NCTL/sh/assets/teardown.sh
source $NCTL/sh/assets/setup.sh config_path=$PATH_TO_CONFIG_TOML chainspec_path=$PATH_TO_CHAINSPEC
if [ "$PREDEFINED_ACCOUNTS" = "true" ]; then
    tar -zxvf net-1-predefined-accounts.tar.gz -C /home/casper/casper-node/utils/nctl/assets/net-1/
fi
source $NCTL/sh/node/start.sh
tail -f /home/casper/casper-node/utils/nctl/assets/net-1/nodes/node-1/logs/stderr.log
