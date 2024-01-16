#! /usr/bin/env python

from flask import Flask, request, jsonify
import subprocess
import os
import toml



app = Flask(__name__)

BASE_SCRIPT_PATH = "/home/casper/casper-node/utils/nctl/sh"
CUSTOM_CHAINSPEC_PATH = "/home/chainspec.toml.in"
DEFAULT_CHAINSPEC_PATH = "/home/casper/casper-node/resources/local/chainspec.toml.in"

# This is for short execution scripts. Hardcoded 5 minutes timeout.
@app.route('/run_script', methods=['POST'])
def run_script():
    data = request.json
    script_name = data.get('name')
    args = data.get('args', [])
    
    if not script_name:
        return jsonify({"error": "No script name provided"}), 400

    full_path = os.path.join(BASE_SCRIPT_PATH, script_name)
    command = ['/bin/bash', full_path] + args

    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True, timeout=300)
        return jsonify({'status': 'success', 'output': result.stdout})
    except subprocess.CalledProcessError as e:
        return jsonify({'status': 'failure', 'output': e.output, 'error': str(e)})


@app.route('/print_file', methods=['GET'])
def print_file():
    file_path = request.args.get('path')

    if not file_path:
        return jsonify({"error": "No file path provided"}), 400

    try:
        with open(file_path, 'r') as file:
            content_lines = []
            for _ in range(1000):
                line = file.readline()
                if not line:
                    break
                content_lines.append(line)
            content = ''.join(content_lines)
        return jsonify({"content": content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/start', methods=['POST'])
def start():
    default_file_path = "/home/chainspec.toml.in"
    alternate_file_path = "/home/casper/casper-node/resources/local/chainspec.toml.in"
    file_path = default_file_path if os.path.exists(default_file_path) else alternate_file_path
    output = []

    try:
        output.append(subprocess.run(['/bin/bash', '/home/casper/casper-node/utils/nctl/sh/assets/teardown.sh'], capture_output=True, text=True, check=True))
        output.append(subprocess.run(['/bin/bash', '/home/casper/casper-node/utils/nctl/sh/assets/setup.sh', file_path], capture_output=True, text=True, check=True))
        output.append(subprocess.run(['/bin/bash', '/home/casper/casper-node/utils/nctl/sh/node/start.sh'], capture_output=True, text=True, check=True))
        return jsonify({"status": "success"})
    
    except subprocess.CalledProcessError as e:
        print(output)
        return jsonify({"error": "Subprocess error", "details": str(e)}), 500
    
    except Exception as e:
        print(output)
        return jsonify({"error": "General error", "details": str(e)}), 500

    
@app.route('/set_chainspec', methods=['POST'])
def set_chainspec():
    content = request.json 

    try:
        toml_content = toml.dumps(content)

        with open(DEFAULT_CHAINSPEC_PATH, 'r') as file:
            template_content = file.read()
        
        template_data = toml.loads(template_content)
        incoming_data = toml.loads(toml_content)

        if set(incoming_data.keys()) != set(template_data.keys()):
            return jsonify({"error": "Structure of incoming data does not match the template"}), 400

    except toml.TomlDecodeError as e:
        return jsonify({"error": "Invalid TOML content"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    try:
        with open(CUSTOM_CHAINSPEC_PATH, 'w') as file:
            toml.dump(incoming_data, file)
        return jsonify({"status": "success", "file_path": CUSTOM_CHAINSPEC_PATH})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


    




'''
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
shell2http.register_command(endpoint="nctl_view_user_accounts", command_name='ls /home/casper/casper-node/utils/nctl/assets/net-1/users/user-1 > cat', callback_fn=callback1, decorators=[])

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
shell2http.register_command(endpoint="view", command_name='ls -a /home/casper/casper-node/utils/nctl/assets/net-1/users/user-1 > cat', callback_fn=callback1, decorators=[])
'''
