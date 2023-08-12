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
