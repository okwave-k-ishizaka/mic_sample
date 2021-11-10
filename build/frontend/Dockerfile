FROM node:14.18.1-alpine3.13

WORKDIR /var/www
COPY ./src/frontend/package.json ./src/frontend/yarn.lock ./
RUN yarn install

EXPOSE 8000

CMD yarn run dev
