FROM node:alpine

COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

RUN pnpm install -r --offline --prod

ADD . ./

CMD [ "node", "dist/src/index.js" ]
