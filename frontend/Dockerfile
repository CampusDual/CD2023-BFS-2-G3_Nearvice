FROM node:12.22.12-alpine3.15 AS build
WORKDIR /app
COPY ./src ./src
COPY angular.json browserslist karma.conf.js ngsw-config.json package.json tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json .
RUN npm install
RUN npm run build --prod
FROM nginx:alpine
RUN echo 'server {listen 80;server_name localhost;location / {root /usr/share/nginx/html;try_files $uri $uri/ /index.html;}}' > /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ontimize-web-ngx-jee-seed/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]