#!/bin/bash

echo api version?
read -r VERSION
sudo docker build -t omrilevy0197/api:"$VERSION" .
sudo docker push omrilevy0197/api:"$VERSION"
ssh root@188.166.60.237 "docker pull omrilevy0197/api:$VERSION && docker-compose up --build"