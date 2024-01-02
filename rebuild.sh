#!/bin/bash


docker-compose down
docker-compose up -d --build


sleep 2
curl -X POST "http://localhost:3001/nctl-start"
