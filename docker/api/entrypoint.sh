#!/bin/sh

## Run required commands before application start

echo "Booting application..."

yarn run migrate

yarn run seed

exec "$@"
