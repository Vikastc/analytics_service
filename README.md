# Analytics_service

This project is a comprehensive analytics platform designed to record all metrics of a service.

# Build
docker build . -t analytics:latest -f Dockerfile.mac

# Compose
docker compose up -d

# . Login to postgres container

```bash
docker exec -it timescaledb /bin/bash
psql -U postgres -d analytics
```

# 9. Create a metrics table

Copy the command to create table from `/metrics_table.sql`
then exit from the docker;

# Login to redis cli
docker exec -it redis_container redis-cli