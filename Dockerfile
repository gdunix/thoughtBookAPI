From node:19-alpine

RUN mkdir -p /usr/src/thoughtbook-api

WORKDIR /usr/src/thoughtbook-api

COPY ./api/package*.json ./
COPY ./api/env.json ./
COPY ./api/server.js ./
COPY ./api/.babelrc ./
COPY ./api/config.js ./
COPY ./api/controllers/ controllers/
COPY ./api/middlewares/ middlewares/
COPY ./api/models/ models/
COPY ./api/routes/ routes/
COPY ./api/utils/ utils/

RUN yarn

CMD ["yarn", "start"]