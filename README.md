# Fondant app

## Curent stage

Currently, the app is being developed. This is just a backend and an nctl container running altogether. 

## Running

1. `docker compose up --`
2. Run `curl -X POST "http://localhost:3000/nctl-start"` to start nctl-network with default configuration.
3. You will see the output from nctl as a response (this will be changed).
4. Now you can access `http://localhost:3000/net/1/rpc` that will call first node RPC endpoint.

## TODO

- [ ] - Add table with default ports mappings
- [ ] - Fix issues with proxy (currently there are some unknown erros when passing the paths)
