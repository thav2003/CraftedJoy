# build environment
FROM node:20-alpine as build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY ./package.json /app/package.json

RUN pnpm install

COPY . .

RUN pnpm run build

# production environment
FROM nginx:1.25.5-alpine

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
