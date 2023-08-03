#!/bin/bash
source includes.sh

cd ${api_dir}
quart --app sr_api:app run &
QUART_PID=$!

cd "../${client_dir}"

yarn openapi-generator-cli generate

# do other stuff
kill $QUART_PID