FROM node:alpine

RUN npm i -g pnpm

COPY pnpm-lock.yaml .
RUN pnpm fetch
ADD . ./

RUN pnpm install --offline
RUN pnpm build:client
