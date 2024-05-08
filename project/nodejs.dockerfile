FROM node:20

RUN npm install -g nodemon
WORKDIR /home/node/app
COPY app/package.json .

RUN npm install
COPY app/ ./ 

RUN npm i
EXPOSE 443
CMD ["nodemon", "server.mjs"]
