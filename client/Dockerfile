FROM node:21

WORKDIR /app/client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY . ./config

ENV PORT=5000

EXPOSE 5000

CMD [ "npm", "start" ]