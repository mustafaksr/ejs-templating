FROM node:13-alpine

RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app

RUN npm install
RUN npm i express

CMD ["node", "index.js"]