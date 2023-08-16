#! /usr/bin/env python

import os
from flask import Flask
from flask_executor import Executor
from flask_shell2http import Shell2HTTP

os.environ['NCTL'] = '/home/casper/casper-node/utils/nctl'
os.environ['NCTL_CASPER_HOME'] = '/home/casper/casper-node'
os.environ['NCTL_CASPER_NODE_LAUNCHER_HOME'] = '/home/casper/casper-node-launcher'
os.environ['NCTL_CASPER_CLIENT_HOME'] = '/home/casper/casper-client-rs'



# Flask application instance
app = Flask(__name__)

executor = Executor(app)
shell2http = Shell2HTTP(app=app, executor=executor, base_url_prefix="/commands/")

def callback1(context, future):
    # Callback function for command1
    print("Command 1:", context, future.result())

# Assets
shell2http.register_command(endpoint="nctl_assets_dump", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/dump.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_assets_ls", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/list.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_assets_setup", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/setup.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_assets_setup_from_stage", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/setup_from_stage.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_assets_teardown", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/teardown.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_assets_upgrade_from_stage", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/upgrade_from_stage.sh "$@"', callback_fn=callback1, decorators=[])

# Binaries
shell2http.register_command(endpoint="nctl_compile", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/compile.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_compile_client", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/compile_client.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_compile_node", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/compile_node.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_compile_node_launcher", command_name='bash /home/casper/casper-node/utils/nctl/sh/assets/compile_node_launcher.sh "$@"', callback_fn=callback1, decorators=[])

# Staging
shell2http.register_command(endpoint="nctl_stage_build", command_name='bash /home/casper/casper-node/utils/nctl/sh/staging/build.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_stage_build_from_settings", command_name='bash /home/casper/casper-node/utils/nctl/sh/staging/build_from_settings.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_stage_init_settings", command_name='bash /home/casper/casper-node/utils/nctl/sh/staging/init_settings.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_stage_set_remote", command_name='bash /home/casper/casper-node/utils/nctl/sh/staging/set_remote.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_stage_set_remotes", command_name='bash /home/casper/casper-node/utils/nctl/sh/staging/set_remotes.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_stage_teardown", command_name='bash /home/casper/casper-node/utils/nctl/sh/staging/teardown.sh "$@"', callback_fn=callback1, decorators=[])

# Node control
shell2http.register_command(endpoint="nctl_clean", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/clean.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_clean_logs", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/clean_logs.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_interactive", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/interactive.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_join", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/join.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_leave", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/leave.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_ports", command_name='docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c "lsof -i tcp | grep casper-no | grep LISTEN | sort"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_processes", command_name='docker exec -t $NCTL_DOCKER_CONTAINER /bin/bash -c \'ps -aux | grep "$NCTL"\'', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_restart", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/restart.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_rotate", command_name='bash /home/casper/casper-node/utils/nctl/sh/misc/rotate_nodeset.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_start", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/start.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_start_after_n_blocks", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/start_after_n_blocks.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_start_after_n_eras", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/start_after_n_eras.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_status", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/status.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_stop", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/stop.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_upgrade_protocol", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/upgrade.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_emergency_upgrade", command_name='bash /home/casper/casper-node/utils/nctl/sh/node/emergency_upgrade.sh "$@"', callback_fn=callback1, decorators=[])

# Blocking commands
shell2http.register_command(endpoint="nctl_await_n_blocks", command_name='bash /home/casper/casper-node/utils/nctl/sh/misc/await_n_blocks.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_await_n_eras", command_name='bash /home/casper/casper-node/utils/nctl/sh/misc/await_n_eras.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_await_until_block_n", command_name='bash /home/casper/casper-node/utils/nctl/sh/misc/await_until_block_n.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_await_until_era_n", command_name='bash /home/casper/casper-node/utils/nctl/sh/misc/await_until_era_n.sh "$@"', callback_fn=callback1, decorators=[])

# Views #1: chain
shell2http.register_command(endpoint="nctl_view_chain_account", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_account.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_auction_info", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_auction_info.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_balance", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_balance.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_balances", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_balances.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_block", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_block.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_block_transfers", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_block_transfers.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_deploy", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_deploy.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_era", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_era.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_era_info", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_era_info.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_height", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_height.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_state_root_hash", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_state_root_hash.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_lfb", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_lfb.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_spec", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_spec.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_chain_spec_accounts", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_chain_spec_accounts.sh "$@"', callback_fn=callback1, decorators=[])

# Views #2: node
shell2http.register_command(endpoint="nctl_view_node_config", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_config.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_error_log", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_log_stderr.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_log", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_log_stdout.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_peers", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_peers.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_peer_count", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_peer_count.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_ports", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_ports.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_rpc_endpoint", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_rpc_endpoint.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_rpc_schema", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_rpc_schema.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_status", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_status.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_storage", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_storage.sh "$@"', callback_fn=callback1, decorators=[])

# Views #3: node metrics
shell2http.register_command(endpoint="nctl_view_node_metrics", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_metrics.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_pending_deploy_count", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_metrics.sh metric=pending_deploy "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_finalised_block_count", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_metrics.sh metric=amount_of_blocks "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_view_node_finalisation_time", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_metrics.sh metric=finalization_time "$@"', callback_fn=callback1, decorators=[])

# Views #4: faucet
shell2http.register_command(endpoint="nctl_view_faucet_account", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_faucet_account.sh "$@"', callback_fn=callback1, decorators=[])

# Views #5: user
shell2http.register_command(endpoint="nctl_view_user_account", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_user_account.sh "$@"', callback_fn=callback1, decorators=[])

# Views #6: validator
shell2http.register_command(endpoint="nctl_view_validator_account", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_validator_account.sh "$@"', callback_fn=callback1, decorators=[])

# Contracts #1: KV storage
shell2http.register_command(endpoint="nctl_contracts_hello_world_install", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-hello-world/do_install.sh "$@"', callback_fn=callback1, decorators=[])

# Contracts #2: Transfers
shell2http.register_command(endpoint="nctl_transfer", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_dispatch_native.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_transfer_native", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_dispatch_native.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_transfer_native_batch_dispatch", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_dispatch_native_batch.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_transfer_native_batch_prepare", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_prepare_native_batch.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_transfer_wasm", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_dispatch_wasm.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_transfer_wasm_batch_dispatch", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_dispatch_wasm_batch.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_transfer_wasm_batch_prepare", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-transfers/do_prepare_wasm_batch.sh "$@"', callback_fn=callback1, decorators=[])

# Contracts #3: Auction
shell2http.register_command(endpoint="nctl_auction_activate", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-auction/do_bid_activate.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_auction_bid", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-auction/do_bid.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_auction_withdraw", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-auction/do_bid_withdraw.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_auction_delegate", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-auction/do_delegate.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_auction_undelegate", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-auction/do_delegate_withdraw.sh "$@"', callback_fn=callback1, decorators=[])

# Contracts #4: ERC-20
shell2http.register_command(endpoint="nctl_erc20_approve", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/do_approve.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_erc20_install", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/do_install.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_erc20_fund_users", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/do_fund_users.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_erc20_transfer", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/do_transfer.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_erc20_view_allowances", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/view_allowances.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_erc20_view_details", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/view_details.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_erc20_view_balances", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-erc20/view_balances.sh "$@"', callback_fn=callback1, decorators=[])

# Contracts #5: KV storage
shell2http.register_command(endpoint="nctl_kv_storage_get_key", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-kv/get_key.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_kv_storage_install", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-kv/do_install.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_kv_storage_set_key", command_name='bash /home/casper/casper-node/utils/nctl/sh/contracts-kv/set_key.sh "$@"', callback_fn=callback1, decorators=[])

# Scenarios #1: Execute protocol upgrade
shell2http.register_command(endpoint="nctl_exec_upgrade_scenario_1", command_name='bash /home/casper/casper-node/utils/nctl/sh/scenarios-upgrades/upgrade_scenario_01.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_exec_upgrade_scenario_2", command_name='bash /home/casper/casper-node/utils/nctl/sh/scenarios-upgrades/upgrade_scenario_02.sh "$@"', callback_fn=callback1, decorators=[])
shell2http.register_command(endpoint="nctl_exec_upgrade_scenario_3", command_name='bash /home/casper/casper-node/utils/nctl/sh/scenarios-upgrades/upgrade_scenario_03.sh "$@"', callback_fn=callback1, decorators=[])

# Secret keys
shell2http.register_command(endpoint="nctl_view_faucet_secret_key", command_name='cat /home/casper/casper-node/utils/nctl/assets/net-1/faucet/secret_key.pem', callback_fn=callback1, decorators=[])


#############
shell2http.register_command(endpoint="nctl_view_node_ports", command_name='bash /home/casper/casper-node/utils/nctl/sh/views/view_node_ports.sh "$@"', callback_fn=callback1, decorators=[])
