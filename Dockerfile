FROM node:14.15.3 AS build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production
# FROM nginx:14.15.3
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /src/app/dist/angular-assignmentor /usr/share/nginx/html