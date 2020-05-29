# Time2code telegram bot with node-telegram-bot-api

> Motivation

- what ? create a telegram bot with [link node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- why ? play with telegram bot
- where ? https://telegram.org
- How ? express.js, node-telegram-bot-api

> Choice of technologies

- VPS with Ubuntu 20.04 Server LTS
- Docker version 19.03.6, build 369ce74a3c
- docker-compose version 1.17.1
- Node version 14
- ExpresJS

> What you will learn? [TBD]

---

## Getting Started

### Prerequisites

> add .env with variables:

```
PORT=3000
BOT_TOKEN=your_telegram_token_from_Bot_Father
QUIZ_API_TOKEN=your_api_quiz_token
```

### ways to run:

- npm start
- dockerfile
- docker-compose

---

## RUN WITH dockerfile

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

---

# INFO

## What we did to install dependency

```
$ npm init
$ npm install express
$ npm install node-telegram-bot-api
$ npm install --save node-fetch
$ npm install --save-dev nodemon
$ npm install --save-dev dotenv
```

## adapt prettier

```
{
  "endOfLine": "auto",
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 120,
  "semi": false
}

```

## get Token

### get telegram token

Every bot must be created via @botfater > run /newbot > get Access token
https://core.telegram.org/bots
https://core.telegram.org/bots#6-botfather

### get quiz token

An API Key for the Quiz API, you can get it totally for free for developers:
https://quizapi.io/clientarea/settings/token

## install docker on vps

```
$ sudo apt-get update
$ sudo apt-get remove docker docker-engine docker.io
$ sudo apt install docker.io
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ docker --version
```

## useful link

[link node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
[link tutorial node-telegram-bot-api](https://github.com/hosein2398/node-telegram-bot-api-tutorial)
[link telegram bot](https://core.telegram.org/bots/api#message)
[link Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

---

# License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
