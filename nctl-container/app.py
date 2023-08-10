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

def my_callback_fn(context, future):
  # optional user-defined callback function
  print(context, future.result())

shell2http.register_command(endpoint="saythis", command_name="/bin/bash run.sh", callback_fn=my_callback_fn, decorators=[])
