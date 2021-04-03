FROM mhart/alpine-node:12 as client

COPY client/package.json client/yarn.lock ./

RUN yarn install

COPY ./client ./
COPY ./_shared ../_shared

RUN yarn run build

FROM nginx:1.15
COPY --from=client /build/ /var/www/html
COPY ./docker/client/nginx.conf /etc/nginx/conf.d/default.conf
