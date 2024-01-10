#!/usr/bin/env bash

./wait-for-it.sh ${DB_HOST}:${DB_PORT} --timeout=300 -- npm run build && npx sequelize-cli db:migrate

exec "$@"
