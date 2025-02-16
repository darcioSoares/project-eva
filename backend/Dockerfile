FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar package.json e package-lock.json antes de instalar as dependências
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

#CMD ["node", "server.js"]
CMD ["npm", "run", "dev"]
