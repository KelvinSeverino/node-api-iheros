FROM node:20

WORKDIR /app

COPY ../app/package.json ./
COPY ../app/index.js ./
COPY ../app/.env ./

RUN npm install

#COPY ../app ./

EXPOSE 3000

CMD npm start