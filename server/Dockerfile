FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY build .
COPY .env.production .env
ENV NODE_ENV production

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /usr/src/app /app/

EXPOSE 3000
CMD [ "node", "server.js" ]
USER node
