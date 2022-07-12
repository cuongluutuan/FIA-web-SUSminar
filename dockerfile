FROM node:14.19.3-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "node", "index.js"]