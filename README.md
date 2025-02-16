# Passo a passo para rodar a aplicação

1. Clone o repositório:

git clone https://github.com/darcioSoares/project-eva
cd project-eva

### Configuração do arquivo .env

Renomeie o arquivo .env-exemplo para .env que se encontra dentro da pasta backend

mv .env-exemplo .env

Já esta com os valores a ser ultilizado pela aplicação

## 2. Suba os containers com Docker: (Executar dentro da Raiz do projeto)

Dentro da pasta do projeto, use o comando:

- docker compose build (criar as imagens)
- docker compose up -d (subir os containers)
- docker compose down (derrubar os containers)

Este comando irá subir os containers necessários para a aplicação.


## Comandos para aplicação
### Para entrar no bash da app e rodar os teste ou força o job a execultar naquele exato momento
docker exec -it app_backend sh
node src/services/jobProcessor.js
npm test

### Verificar logs do backend, consegue ver os jobs sendo execultados
- docker logs -f app_backend (logs backend)

- docker-compose restart backend (restart container)

--------------------------------------------------------------------------------
# Tecnologias Utilizadas
- node.js
- react.js
- redis
- mongodb
- docker

## Principais bibliotecas
- express.js
- bull.js
- jest
- tailwindcss

--------------------------------------------------------------------------------

### Observação 
- Demais informaçoes do backend estara no readme da pasta backend
- Demais informaçoes do frontend estara no readme da pasta frontend

## Aplicação roda
- backend  http://localhost:3000/
- frontend http://localhost:5173/

