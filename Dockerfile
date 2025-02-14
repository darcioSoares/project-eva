# Usar uma imagem oficial do Node.js
FROM node:18-alpine

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json antes de instalar as dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto para dentro do container
COPY . .

# Expor a porta da API
EXPOSE 3000

# Comando para rodar o backend
CMD ["node", "server.js"]
