FROM node:14.15.3 AS build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install quill
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/angular-assignmentor /usr/share/nginx/html