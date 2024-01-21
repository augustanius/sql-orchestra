#!/bin/bash
# 123
set -e;
if [ -n "${POSTGRES_USER:-}" ] && [ -n "${POSTGRES_PASSWORD:-}" ]; then
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE ${PROJECT_DB};
	EOSQL
else
	echo "SETUP INFO: No Environment variables given!"
fi
