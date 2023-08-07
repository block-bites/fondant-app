# Casper NCTL - Docker Container

> **Warning**
> Images published on Docker Hub are not stable on Apple computers with M1/M2 chips. We recommend that you build the docker image locally using the  [BUILD](./BUILD.md) instructions.

[NCTL](https://github.com/casper-network/casper-node/tree/release-1.4.3/utils/nctl) is a CLI application to control one or multiple Casper networks locally. Many developers wish to spin up relatively small test networks to localize their testing before deploying to the blockchain.

## How to use this image

### Start a network with five nodes

To create a container with the NCTL image write:

```bash
docker run --rm -it --name mynctl -d -p 11101:11101 -p 14101:14101 -p 18101:18101 makesoftware/casper-nctl
```

where `mynctl` is the name of the container. The ports for the first node in the network are published to the host.

Alternatively, you can use `docker-compose` to start and stop the container. Download the file [`docker-compose.yml`](https://raw.githubusercontent.com/make-software/casper-nctl-docker/master/docker-compose.yml) 
in this repository and write:

```bash 
docker-compose up
```

### Activate `nctl-*` commands

To activate `nctl-*` commands in your local host, run the following command in a bash console:

```bash
source nctl-activate.sh mynctl
```

In a Powershell terminal, run:

```bash
. .\nctl-activate.ps1 mynctl
```

where `mynctl` is the name of the container.

Now you can write in the host machine commands like `nctl-view-faucet-account`, `nctl-transfer-native`, etc. For a complete list of commands, visit [this page](https://github.com/casper-network/casper-node/blob/release-1.4.3/utils/nctl/docs/commands.md).

Sometimes you may need the secret key of the faucet, a node or one of the predefined users. After activating `nctl-*` commands you can execute the following commands:

```bash
nctl-view-faucet-secret-key
```

```bash
nctl-view-node-secret-key node=1
```

```bash
nctl-view-user-secret-key user=3
```

### Run the container with predefined account keys

Each time the container is started, nctl runs with a set of randomly generated account keys. To use a set of predefined and pregenerated account keys, run the container with the environment variable `PREDEFINED_ACCOUNTS` set to `true`:

```bash
docker run --rm -it --name mynctl -d -p 11101:11101 --env PREDEFINED_ACCOUNTS=true makesoftware/casper-nctl
```

If you're using the `docker-compose` command, add the environment variable to the `nctl` service.

### Change the settings using environment variables

Using environment variables you can tweak few parameters to change the frequency of blocks and the  deploys processing speed.

| Environment variable   | Default value | Description                                                                                                                                                                                                                                                                           |
|------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MINIMUM_ROUND_EXPONENT | 12            | Integer between 0 and 255 (0 included).  The power of two that is the number of milliseconds in the minimum round length, and therefore the minimum delay between a block and its child.  E.g. 12 means 2^12 milliseconds, i.e. about 4 seconds.                                                   |
| MAXIMUM_ROUND_EXPONENT | 19            | Integer between 0 and 255 (255 included).  Must be greater than `minimum_round_exponent`.  The power of two that is the number of milliseconds in the maximum round length, and therefore the maximum delay between a block and its child.  E.g. 19 means 2^19 milliseconds, i.e. about 8.7 minutes. |
| DEPLOY_DELAY           | 1min          | Deploys are only proposed in a new block if they have been received at least this long ago.                                                                                                                                                                                           |

:warning: **Change these values carefully**. Too low or too high minimum/maximum round exponent values will make the nodes malfunction.

You can also use your custom chainspec.toml and config.toml files:

| Environment variable | Description                                                                                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PATH_TO_CHAINSPEC    | Absolute path to your custom `chainspec.toml` file. Usually you'll need to mount a volume connected to your host to make the file available in the container. |
| PATH_TO_CONFIG_TOML  | Absolute path to your custom `config.toml` configuration file for the nodes.                                                                                  |

Usually you'll need to mount a volume connected to your host to make the file available in the container.

### Stop the container

To stop the container write:

```bash
docker stop mynctl
```

Or, if you're using `docker-compose` write:

```bash
docker-compose stop
```

### Container shell access

The docker exec command allows you to run commands inside a Docker container. The following command line will give you a bash shell inside your nctl container:

```bash
docker exec -it mynctl bash
```

In the container shell you can use the `casper-client` tool as well as the `nctl-*` set of commands.

## Use `cors-anywhere` to interact with the nodes from a browser

Browsers block direct RPC calls to Casper nodes due to CORS. If you're developing a web app you may use `cors-anywhere` to overcome this situation. 

The `cors` folder in this repository contains a Docker Compose configuration to start a node.js server running `cors-anywhere` in addition to the NCTL container. To start both containers run the following command:

```bash
docker-compose --profile cors-anywhere up
```

Next, change your web app configuration to send the RPC calls to the node.js server indicating the casper node it has to redirect the traffic to:

```
http://127.0.0.1:11100/http://mynctl:11101/rpc
```

## Use the Docker image in a GitHub action

An example of a GitHub Action running NCTL as a service container to execute integration tests.

```yaml
name: CI

on:
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  integration-test:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    # Service containers to run with `runner-job`
    services:
      # Label used to access the service container
      casper-nctl:
        # Docker Hub image
        image: makesoftware/casper-nctl:latest
        options: --name casper-nctl
        env:
          PREDEFINED_ACCOUNTS: 'true'
          MINIMUM_ROUND_EXPONENT: '12'
          MAXIMUM_ROUND_EXPONENT: '14'
          DEPLOY_DELAY: '12sec'        
        ports:
          # Opens RPC, REST and events ports on the host and service container
          - 11101:11101
          - 14101:14101
          - 18101:18101
          
    steps:
      - uses: actions/checkout@v2
      - name: Setup .NET
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 5.0.x
      - name: Obtain faucet secret key from container
        run: docker exec -t casper-nctl cat /home/casper/casper-node/utils/nctl/assets/net-1/faucet/secret_key.pem > Casper.Network.SDK.Test/TestData/faucetact.pem
      - name: Restore dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --no-restore
      - name: Test
        run: dotnet test --no-build --verbosity normal --settings Casper.Network.SDK.Test/test.runsettings --filter="TestCategory=NCTL" 
```

## Build the Docker image from sources

To build the NCTL Docker image from the `casper-node` sources, follow the instructions in [BUILD](./BUILD.md) page.