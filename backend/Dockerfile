FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

RUN chown -R node:node /usr/src/app
USER node

CMD ["npm", "run", "dev"]
