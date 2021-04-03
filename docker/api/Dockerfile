FROM mhart/alpine-node:12

WORKDIR /app

COPY api/package.json api/yarn.lock ./

RUN yarn install

COPY ./api ./
COPY ./_shared ../_shared

RUN yarn run build

COPY ./docker/api/entrypoint.sh ./

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "dist/src/main.js"]
