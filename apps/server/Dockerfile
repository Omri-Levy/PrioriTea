FROM node:18-alpine3.14

ENV NODE_ENV production

COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

RUN pnpm install -r --offline --prod

COPY . ./

EXPOSE 8080

CMD [ "node", "dist/src/index.js" ]

