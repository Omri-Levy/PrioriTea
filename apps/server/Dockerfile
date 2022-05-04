FROM alpine:3.15.4

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --update npm

COPY . .

RUN npm ci --only=production

ENV NODE_ENV production

EXPOSE 8080

CMD [ "node", "dist/src/index.js" ]

