FROM node:lts AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
RUN apk add --no-cache openssh && \
    ssh-keygen -A && \
    mkdir -p /run/nginx && \
    mkdir -p /root/.ssh && \
    echo "root:Docker!" | chpasswd

COPY --from=build-stage /app/dist/frelance-client /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

ARG PORT=80
EXPOSE ${PORT} 2222

CMD ["/bin/sh", "-c", "nginx && /usr/sbin/sshd -D"]
