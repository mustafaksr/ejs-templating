FROM node:19-alpine

RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app

RUN npm install
RUN npm i express

# Expose port 3000 (or any other port you want to use)
EXPOSE 3000

CMD ["node", "index.js"]