#!/bin/bash

set -e;

echo "⛳️ 도커 컨테이너 중지"
docker stop front-container | true

echo "⛳️ 도커 컨테이너 삭제"
docker rm front-container | true

echo "⛳️ 도커 이미지 삭제"
docker rmi front-image | true

echo "⛳️ 도커 이미지 생성"
docker build -t front-image . | true

echo "⛳️ 도커 컨테이너 생성"
docker run -d -p 780:80 --name front-container --net daewoo_a_network front-image | true