FROM node:21

WORKDIR /client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY . ./config

ENV PORT=5044

EXPOSE 5044

CMD [ "npm", "start" ]