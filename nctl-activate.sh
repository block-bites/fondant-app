#!/usr/bin/env bash

export NCTL_DOCKER_CONTAINER=${1:-"mynctl"}
export NCTL_HOME=/home/casper/casper-node/utils/nctl

# ###############################################################
# ALIASES
# ###############################################################

# Assets.
nctl-assets-dump() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/dump.sh $@"; } 
nctl-assets-ls() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/list.sh $@"; } 
nctl-assets-setup() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/setup.sh $@"; } 
nctl-assets-setup-from-stage() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/setup_from_stage.sh $@"; } 
nctl-assets-teardown() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/teardown.sh $@"; } 
nctl-assets-upgrade-from-stage() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/upgrade_from_stage.sh $@"; } 

# Binaries.
nctl-compile() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile.sh $@"; } 
nctl-compile-client() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile_client.sh $@"; } 
nctl-compile-node() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile_node.sh $@"; } 
nctl-compile-node-launcher() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile_node_launcher.sh $@"; } 

# Staging.
nctl-stage-build() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/build.sh $@"; } 
nctl-stage-build-from-settings() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/build_from_settings.sh $@"; } 
nctl-stage-init-settings() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/init_settings.sh $@"; } 
nctl-stage-set-remote() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/set_remote.sh $@"; } 
nctl-stage-set-remotes() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/set_remotes.sh $@"; } 
nctl-stage-teardown() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/teardown.sh $@"; } 

# Node control.
nctl-clean() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/clean.sh $@"; } 
nctl-clean-logs() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/clean_logs.sh $@"; } 
nctl-interactive() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/interactive.sh $@"; } 
nctl-join() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/join.sh $@"; } 
nctl-leave() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/leave.sh $@"; } 
nctl-ports() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "lsof -i tcp | grep casper-no | grep LISTEN | sort"; }
nctl-processes() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c 'ps -aux | grep "$NCTL"'; }
nctl-restart() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/restart.sh $@"; } 
nctl-rotate() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/rotate_nodeset.sh $@"; } 
nctl-start() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/start.sh $@"; } 
nctl-start-after-n-blocks() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/start_after_n_blocks.sh $@"; }
nctl-start-after-n-eras() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/start_after_n_eras.sh $@"; } 
nctl-status() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/status.sh $@"; } 
nctl-stop() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/stop.sh $@"; } 
nctl-upgrade-protocol() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/upgrade.sh $@"; } 
nctl-emergency-upgrade() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/emergency_upgrade.sh $@"; } 

# Blocking commands.
nctl-await-n-blocks() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_n_blocks.sh $@"; } 
nctl-await-n-eras() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_n_eras.sh $@"; } 
nctl-await-until-block-n() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_until_block_n.sh $@"; } 
nctl-await-until-era-n() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_until_era_n.sh $@"; } 

# Views #1: chain.
nctl-view-chain-account() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_account.sh $@"; } 
nctl-view-chain-auction-info() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_auction_info.sh $@"; } 
nctl-view-chain-balance() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_balance.sh $@"; } 
nctl-view-chain-balances() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_balances.sh $@"; } 
nctl-view-chain-block() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_block.sh $@"; } 
nctl-view-chain-block-transfers() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_block_transfers.sh $@"; } 
nctl-view-chain-deploy() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_deploy.sh $@"; } 
nctl-view-chain-era() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_era.sh $@"; } 
nctl-view-chain-era-info() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_era_info.sh $@"; } 
nctl-view-chain-height() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_height.sh $@"; } 
nctl-view-chain-state-root-hash() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_state_root_hash.sh $@"; } 
nctl-view-chain-lfb() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_lfb.sh $@"; } 
nctl-view-chain-spec() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_spec.sh $@"; } 
nctl-view-chain-spec-accounts() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_spec_accounts.sh $@"; } 

# Views #2: node.
nctl-view-node-config() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_config.sh $@"; } 
nctl-view-node-error-log() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_log_stderr.sh $@"; } 
nctl-view-node-log() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_log_stdout.sh $@"; } 
nctl-view-node-peers() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_peers.sh $@"; } 
nctl-view-node-peer-count() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_peer_count.sh $@"; } 
nctl-view-node-ports() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_ports.sh $@"; } 
nctl-view-node-rpc-endpoint() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_rpc_endpoint.sh $@"; } 
nctl-view-node-rpc-schema() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_rpc_schema.sh $@"; } 
nctl-view-node-status() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_status.sh $@"; } 
nctl-view-node-storage() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_storage.sh $@"; } 

# Views #3: node metrics.
nctl-view-node-metrics() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh $@"; } 
nctl-view-node-pending-deploy-count() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh metric=pending_deploy $@"; }
nctl-view-node-finalised-block-count() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh metric=amount_of_blocks $@"; }
nctl-view-node-finalisation-time() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh metric=finalization_time $@"; }

# Views #4: faucet.
nctl-view-faucet-account() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_faucet_account.sh $@"; }

# Views #5: user.
nctl-view-user-account() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_user_account.sh $@"; }

# Views #6: validator.
nctl-view-validator-account() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_validator_account.sh $@"; }

# Contracts #1: KV storage.
nctl-contracts-hello-world-install() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-hello-world/do_install.sh $@"; } 

# Contracts #2: Transfers.
nctl-transfer() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_native.sh $@"; } 
nctl-transfer-native() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_native.sh $@"; } 
nctl-transfer-native-batch-dispatch() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_native_batch.sh $@"; } 
nctl-transfer-native-batch-prepare() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_prepare_native_batch.sh $@"; } 
nctl-transfer-wasm() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_wasm.sh $@"; } 
nctl-transfer-wasm-batch-dispatch() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_wasm_batch.sh $@"; } 
nctl-transfer-wasm-batch-prepare() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_prepare_wasm_batch.sh $@"; } 

# Contracts #3: Auction.
nctl-auction-activate() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_bid_activate.sh $@"; } 
nctl-auction-bid() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_bid.sh $@"; } 
nctl-auction-withdraw() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_bid_withdraw.sh $@"; } 
nctl-auction-delegate() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_delegate.sh $@"; } 
nctl-auction-undelegate() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_delegate_withdraw.sh $@"; } 

# Contracts #4: ERC-20.
nctl-erc20-approve() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_approve.sh $@"; } 
nctl-erc20-install() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_install.sh $@"; } 
nctl-erc20-fund-users() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_fund_users.sh $@"; } 
nctl-erc20-transfer() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_transfer.sh $@"; } 
nctl-erc20-view-allowances() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/view_allowances.sh $@"; } 
nctl-erc20-view-details() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/view_details.sh $@"; } 
nctl-erc20-view-balances() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/view_balances.sh $@"; } 

# Contracts #5: KV storage.
nctl-kv-storage-get-key() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-kv/get_key.sh $@"; } 
nctl-kv-storage-install() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-kv/do_install.sh $@"; } 
nctl-kv-storage-set-key() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-kv/set_key.sh $@"; } 

# Scenarios #1: Execute protocol upgrade.
nctl-exec-upgrade-scenario-1() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/scenarios-upgrades/upgrade_scenario_01.sh $@"; } 
nctl-exec-upgrade-scenario-2() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/scenarios-upgrades/upgrade_scenario_02.sh $@"; } 
nctl-exec-upgrade-scenario-3() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/scenarios-upgrades/upgrade_scenario_03.sh $@"; } 

# Secret keys
nctl-view-faucet-secret-key() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "cat $NCTL_HOME/assets/net-1/faucet/secret_key.pem"; }
nctl-view-user-secret-key() { 
    userx=`echo $1 | sed 's/=/-/'`;
    docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "cat $NCTL_HOME/assets/net-1/users/$userx/secret_key.pem";
}
nctl-view-node-secret-key() { 
    nodex=`echo $1 | sed 's/=/-/'`;
    docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "cat $NCTL_HOME/assets/net-1/nodes/$nodex/keys/secret_key.pem";
}