# Time2sport telegram bot

> what ? create a telegram bot with

- foaas (https://www.foaas.com/)
- dev quiz (https://quizapi.io/)

> why ? play with telegram bot

> where ?

> How ? express.js, Telegraf.js

> Test on VPS with configuration:

- VPS with Ubuntu 18.04.4 LTS
- Docker version 19.03.6, build 369ce74a3c
- docker-compose version 1.17.1

##

# install dependecy

```
$ npm init
$ npm install express telegraf
$ npm install --save node-fetch
$ npm install --save-dev nodemon
$ npm install --save-dev dotenv
```

# install dependecy

Every bot must be created via @botfater > run /newbot > get Access token
https://core.telegram.org/bots

```
a
```

# docker

```
$ docker build -t telegram-bot-image .
$ docker run -d --env-file .env -p 3000:3000 --name telegram-bot telegram-bot-image
$ docker container ls -a
$ docker ps
$ docker logs telegram-bot
$ docker exec -it telegram-bot /bin/sh
$ docker container stop telegram-bot
$ docker container rm telegram-bot

```

## RUN WITH docker-compose

```
$ docker-compose build
$ docker-compose up -d
$ docker-compose ps
$ docker-compose down
```

# quiz

Prerequisites
An API Key for the Quiz API, you can get it totally for free for developers:
https://quizapi.io/clientarea/settings/token
