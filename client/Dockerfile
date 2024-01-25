FROM node:21

WORKDIR /client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "start" ]