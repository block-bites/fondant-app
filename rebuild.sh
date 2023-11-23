#!/bin/bash

docker-compose down
docker-compose build
docker-compose up -d

sleep 2
curl -X POST "http://localhost:3000/nctl-start"