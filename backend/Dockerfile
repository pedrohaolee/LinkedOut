FROM node:22-alpine3.19

COPY . /server

WORKDIR server

RUN npm install

ENTRYPOINT ["node","server.js"]