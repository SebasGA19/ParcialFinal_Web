
docker-compose down --remove-orphans -v

if (Test-Path -Path "backend-data") {
    rm -r backend-data
}

if (Test-Path -Path "mongo-data") {
    rm -r mongo-data
}

docker-compose up --build -d
