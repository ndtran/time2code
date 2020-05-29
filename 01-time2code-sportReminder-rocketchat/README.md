# Time2sport reminder

> Motivation

- what ? Exercices reminder (9:15 - 11:15 - 14:15 - 16:15)
- why ? During the confinement, it's good to stay in good health. Especially with coworkers and work communication channel.
- where ? Use with the rocket chat of MARCOPOLO project.
- How ? cron job on Apline with docker

> Choice of technologies

- VPS with Ubuntu 20.04 Server LTS
- Docker version 19.03.6, build 369ce74a3c
- docker-compose version 1.17.1
- bash

> What you will learn? [TBD]

---

## Getting Started

### Prerequisites

> add .env with variables:

```
ROCKETCHAT_TOKEN=your_rocketChat_token
ROCKETCHAT_USERID=your_rocketChat_userId
```

### ways to run:

- exec with bash the file time2sport.sh
- dockerfile
- docker-compose

---

## RUN WITH dockerfile

```
$ docker build -t time2sport-image .
$ docker run -d --env-file ./env --name time2sport-cron time2sport-image
$ docker container ls -a
$ docker ps
$ docker exec -it time2sport-cron /bin/bash
$ docker container stop time2sport-cron
$ docker container rm time2sport-cron
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

## install docker on vps

```
$ sudo apt-get update
$ sudo apt-get remove docker docker-engine docker.io
$ sudo apt install docker.io
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ docker --version
```

## cron

```
$ crontab -l  // get list
$ crontab -e  // edit list
```

---

# License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
