FROM node:21

WORKDIR /webapp/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${DB_PORT}

EXPOSE ${SERVER_PORT}

EXPOSE ${API_PORT}

CMD [ "npm", "start" ]