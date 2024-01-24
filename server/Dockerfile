FROM node:21

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5042

EXPOSE 5042

CMD [ "npm", "start" ]