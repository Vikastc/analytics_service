# Analytics_service

This project is a comprehensive analytics platform designed to record all metrics of a service.

# Build
docker build . -t analytics:latest -f Dockerfile.mac

# Compose
docker compose up -d

# Login to redis cli
docker exec -it redis_container redis-cli