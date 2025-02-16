docker exec -it app_backend sh
node src/services/jobProcessor.js

docker logs -f app_backend

-------------
Reiniciar e Ver Logs Novamente
docker-compose restart backend
docker logs -f app_backend

--subir container e já entrar no log
docker compose up -d --build
docker logs -f app_backend


testes
envio de email real
variavel de ambiente front end
