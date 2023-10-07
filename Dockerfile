FROM node:18-alpine as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build


FROM nginx:alpine

#!/bin/sh
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /var/www/html/
ENV NGINX_PORT=8080
EXPOSE 8080

CMD ["nginx","-g","daemon off;"]