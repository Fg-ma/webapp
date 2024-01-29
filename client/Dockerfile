FROM node:21

WORKDIR /webapp/client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY . ./config

EXPOSE ${FRONTEND_PORT}

CMD [ "npm", "start" ]