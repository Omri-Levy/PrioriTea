FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

COPY .env.production .env

ENV NODE_ENV production

EXPOSE 8081
CMD ["node", "app.js" ]
USER node
