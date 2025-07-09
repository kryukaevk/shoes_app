FROM node:20

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/shoes-app-frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/shoes-app-backend
RUN npm i

EXPOSE 3002

CMD [ "node", "app.js" ]