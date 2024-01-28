FROM node:21

WORKDIR /webapp/server

COPY package*.json ./

RUN npm install

COPY . .

ENV SERVER_PORT=5041

ENV API_PORT=5042

ENV DB_PORT=3306

EXPOSE 3306

EXPOSE 5041

EXPOSE 5042

CMD [ "npm", "start" ]