docker-compose down
docker-compose build
docker-compose up -d

Start-Sleep -Seconds 2
Invoke-WebRequest -Method Post -Uri "http://localhost:3001/nctl-start"
