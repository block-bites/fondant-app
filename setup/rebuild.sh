#!/bin/bash

if [[ "${PWD##*/}" != "fondant-app" ]]; then
    echo "Please execute this script in the fondant-app folder."
    exit 1
fi


docker-compose down

docker-compose build

docker-compose up