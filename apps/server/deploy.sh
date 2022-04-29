#!/bin/bash

echo api version?
read -r VERSION
sudo docker build -t omrilevy0197/api:"$VERSION" .
sudo docker push omrilevy0197/api:"$VERSION"
ssh root@142.93.236.134 "docker pull omrilevy0197/api:$VERSION && docker tag omrilevy0197/api:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"