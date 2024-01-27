FROM node:21

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5041

EXPOSE 5041

CMD [ "npm", "start" ]