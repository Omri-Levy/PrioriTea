#!/bin/bash

echo Image version?
read -r VERSION
sudo docker build -t omrilevy0197/prioritea:"$VERSION" .
sudo docker push omrilevy0197/prioritea:"$VERSION"
ssh root@188.166.60.237 "docker pull omrilevy0197/prioritea:$VERSION && docker tag omrilevy0197/prioritea:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"