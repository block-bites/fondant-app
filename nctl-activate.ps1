param (
    [parameter(Mandatory=$false)]
    [String]$container
)

$NCTL_DOCKER_CONTAINER="mynctl"
$NCTL_HOME="/home/casper/casper-node/utils/nctl"

if($PSBoundParameters.ContainsKey('container')) {
    $NCTL_DOCKER_CONTAINER=$container
}

# ###############################################################
# ALIASES
# ###############################################################

# Assets.
function nctl-assets-dump($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/dump.sh $params" } 
function nctl-assets-ls($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/list.sh $params" } 
function nctl-assets-setup($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/setup.sh $params" } 
function nctl-assets-setup-from-stage($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/setup_from_stage.sh $params" } 
function nctl-assets-teardown($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/teardown.sh $params" } 
function nctl-assets-upgrade-from-stage($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/upgrade_from_stage.sh $params" } 

# Binaries.
function nctl-compile($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile.sh $params" } 
function nctl-compile-client($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile_client.sh $params" } 
function nctl-compile-node($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile_node.sh $params" } 
function nctl-compile-node-launcher($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/assets/compile_node_launcher.sh $params" } 

# Staging.
function nctl-stage-build($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/build.sh $params" } 
function nctl-stage-build-from-settings($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/build_from_settings.sh $params" } 
function nctl-stage-init-settings($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/init_settings.sh $params" } 
function nctl-stage-set-remote($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/set_remote.sh $params" } 
function nctl-stage-set-remotes($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/set_remotes.sh $params" } 
function nctl-stage-teardown($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/staging/teardown.sh $params" } 

# Node control.
function nctl-clean($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/clean.sh $params" } 
function nctl-clean-logs($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/clean_logs.sh $params" } 
function nctl-interactive($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/interactive.sh $params" } 
function nctl-join($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/join.sh $params" } 
function nctl-leave($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/leave.sh $params" } 
function nctl-ports {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c 'lsof -i tcp | grep casper-no | grep LISTEN | sort' }
function nctl-processes {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c 'ps -aux | grep "$NCTL"' }
function nctl-restart($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/restart.sh $params" } 
function nctl-rotate($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/rotate_nodeset.sh $params" } 
function nctl-start($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/start.sh $params" } 
function nctl-start-after-n-blocks($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/start_after_n_blocks.sh $params" }
function nctl-start-after-n-eras($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/start_after_n_eras.sh $params" } 
function nctl-status($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/status.sh $params" } 
function nctl-stop($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/stop.sh $params" } 
function nctl-upgrade-protocol($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/upgrade.sh $params" } 
function nctl-emergency-upgrade($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/node/emergency_upgrade.sh $params" } 

# Blocking commands.
function nctl-await-n-blocks($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_n_blocks.sh $params" } 
function nctl-await-n-eras($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_n_eras.sh $params" } 
function nctl-await-until-block-n($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_until_block_n.sh $params" } 
function nctl-await-until-era-n($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/misc/await_until_era_n.sh $params" } 

# Views #1: chain.
function nctl-view-chain-account($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_account.sh $params" } 
function nctl-view-chain-auction-info($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_auction_info.sh $params" } 
function nctl-view-chain-balance($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_balance.sh $params" } 
function nctl-view-chain-balances($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_balances.sh $params" } 
function nctl-view-chain-block($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_block.sh $params" } 
function nctl-view-chain-block-transfers($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_block_transfers.sh $params" } 
function nctl-view-chain-deploy($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_deploy.sh $params" } 
function nctl-view-chain-era($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_era.sh $params" } 
function nctl-view-chain-era-info($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_era_info.sh $params" } 
function nctl-view-chain-height($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_height.sh $params" } 
function nctl-view-chain-state-root-hash($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_state_root_hash.sh $params" } 
function nctl-view-chain-lfb($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_lfb.sh $params" } 
function nctl-view-chain-spec($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_spec.sh $params" } 
function nctl-view-chain-spec-accounts($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_chain_spec_accounts.sh $params" } 

# Views #2: node.
function nctl-view-node-config($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_config.sh $params" } 
function nctl-view-node-error-log($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_log_stderr.sh $params" } 
function nctl-view-node-log($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_log_stdout.sh $params" } 
function nctl-view-node-peers($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_peers.sh $params" } 
function nctl-view-node-peer-count($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_peer_count.sh $params" } 
function nctl-view-node-ports($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_ports.sh $params" } 
function nctl-view-node-rpc-endpoint($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_rpc_endpoint.sh $params" } 
function nctl-view-node-rpc-schema($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_rpc_schema.sh $params" } 
function nctl-view-node-status($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_status.sh $params" } 
function nctl-view-node-storage($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_storage.sh $params" } 

# Views #3: node metrics.
function nctl-view-node-metrics($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh $params" } 
function nctl-view-node-pending-deploy-count($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh metric=pending_deploy $params" }
function nctl-view-node-finalised-block-count($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh metric=amount_of_blocks $params" }
function nctl-view-node-finalisation-time($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_node_metrics.sh metric=finalization_time $params" }

# Views #4: faucet.
function nctl-view-faucet-account($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_faucet_account.sh $params" } 

# Views #5: user.
function nctl-view-user-account($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_user_account.sh $params" }

# Views #6: validator.
function nctl-view-validator-account($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/views/view_validator_account.sh $params" }

# Contracts #1: KV storage.
function nctl-contracts-hello-world-install($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-hello-world/do_install.sh $params" } 

# Contracts #2: Transfers.
function nctl-transfer($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_native.sh $params" } 
function nctl-transfer-native($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_native.sh $params" } 
function nctl-transfer-native-batch-dispatch($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_native_batch.sh $params" } 
function nctl-transfer-native-batch-prepare($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_prepare_native_batch.sh $params" } 
function nctl-transfer-wasm($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_wasm.sh $params" } 
function nctl-transfer-wasm-batch-dispatch($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_dispatch_wasm_batch.sh $params" } 
function nctl-transfer-wasm-batch-prepare($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-transfers/do_prepare_wasm_batch.sh $params" } 

# Contracts #3: Auction.
function nctl-auction-activate($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_bid_activate.sh $params" } 
function nctl-auction-bid($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_bid.sh $params" } 
function nctl-auction-withdraw($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_bid_withdraw.sh $params" } 
function nctl-auction-delegate($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_delegate.sh $params" } 
function nctl-auction-undelegate($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-auction/do_delegate_withdraw.sh $params" } 

# Contracts #4: ERC-20.
function nctl-erc20-approve($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_approve.sh $params" } 
function nctl-erc20-install($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_install.sh $params" } 
function nctl-erc20-fund-users($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_fund_users.sh $params" } 
function nctl-erc20-transfer($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/do_transfer.sh $params" } 
function nctl-erc20-view-allowances($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/view_allowances.sh $params" } 
function nctl-erc20-view-details($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/view_details.sh $params" } 
function nctl-erc20-view-balances($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-erc20/view_balances.sh $params" } 

# Contracts #5: KV storage.
function nctl-kv-storage-get-key($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-kv/get_key.sh $params" } 
function nctl-kv-storage-install($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-kv/do_install.sh $params" } 
function nctl-kv-storage-set-key($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/contracts-kv/set_key.sh $params" } 

# Scenarios #1: Execute protocol upgrade.
function nctl-exec-upgrade-scenario-1($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/scenarios-upgrades/upgrade_scenario_01.sh $params" } 
function nctl-exec-upgrade-scenario-2($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/scenarios-upgrades/upgrade_scenario_02.sh $params" } 
function nctl-exec-upgrade-scenario-3($params) {docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "source $NCTL_HOME/sh/scenarios-upgrades/upgrade_scenario_03.sh $params" } 

# Secret keys
function nctl-view-faucet-secret-key() { docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "cat $NCTL_HOME/assets/net-1/faucet/secret_key.pem"; }
function nctl-view-user-secret-key($params) { 
    $userx=$params.replace('=', '-')
    docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "cat $NCTL_HOME/assets/net-1/users/$userx/secret_key.pem";
}
function nctl-view-node-secret-key($params) { 
    $nodex=$params.replace('=', '-')
    docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "cat $NCTL_HOME/assets/net-1/nodes/$nodex/keys/secret_key.pem";
}
