FROM node:lts AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build-stage /app/dist/frelance-client /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

ARG PORT=80
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
