FROM alpine:3.15.4

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD [ "node", "build/src/server.js" ]

USER node
