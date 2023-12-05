# Fondant app

## Curent stage

Currently, the app is being developed. This is just a backend and an nctl container running altogether. 

## Running

1. `docker compose build --`
2. `docker compose up --`
3. Run `curl -X POST "http://localhost:3000/nctl-start"` to start nctl-network with default configuration.
4. You will see the output from nctl as a response (this will be changed).
5. Now you can use `http://localhost:3000/net/1/rpc` as an RPC endpoint. For example you can do:
    - `casper-client get-node-status -n http://localhost:3000/net/1/rpc` to get status of `node-1` 
    - `casper-client get-block -n http://localhost:3000/net/2/rpc` and you should get a latest block info.
    - `casper-client get-state-root-hash -n http://localhost:3000/net/3/rpc` and you should get current state root hash (if the first block got emited)
    By default we support nodes from `1` to `5` but in future this will be configurable.


## Documentation

    All avaliable endpoints are described in the OpenAPI.yml file.
 

## TODO
- [ ] Add RPC tests
- [ ] Add SSE tests
- [ ] Add configurable options
- [ ] Add UI on top of it





