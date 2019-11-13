FROM alpine:3.10
RUN apk add --no-cache nodejs nodejs-npm
RUN npm install -g forever

RUN mkdir -p /app
COPY ./app /app
WORKDIR /app

RUN npm install && npm cache clean --force

EXPOSE 80

CMD ["npm", "start"]
