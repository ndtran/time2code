# Time2sport reminder

> what ? Exercices reminder (9:15 - 11:15 - 14:15 - 16:15)

> why ? During the confinement, it's good to stay in good health. Especially with coworkers and work communication channel.

> where ? Use with the rocket chat of MARCOPOLO project.

> How ? cron job on Apline with docker

> Test on VPS with configuration:

- VPS with Ubuntu 18.04.4 LTS
- Docker version 19.03.6, build 369ce74a3c
- docker-compose version 1.17.1

## Getting Started

> Motivation [TBD]

> Choice of technologies [TBD]

> What you will learn? [TBD]

### you will need

> add .env with variables:

- ROCKETCHAT_TOKEN='xxx'
- ROCKETCHAT_USERID='yyy'

> three ways to run:

- dockerfile
- docker-compose
- deploy in docker swarm

### install docker

```
$ sudo apt-get update
$ sudo apt-get remove docker docker-engine docker.io
$ sudo apt install docker.io
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ docker --version
```

---

## RUN WITH dockerfile script

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

## RUN WITH docker swarm

[TBD] below, not finish yet

### INIT swarm + add swarmpit (http://localhost:888/) (if not already done)

```
$ docker swarm init
$ docker run -it --rm \
 --name swarmpit-installer \
 --volume /var/run/docker.sock:/var/run/docker.sock \
 swarmpit/install:1.9
```

### deploy to swarm (https://docs.docker.com/engine/swarm/stack-deploy/)

### create local registery

```
$ docker run -d -p 5000:5000 --restart=always --name registry registry:2
$ docker container stop registry
$ docker container stop registry && docker container rm -v registry
$ docker stack rm stackdemo
$ docker service rm registry
```

### docker-compose push not working on my machine to deploy on local register yet

```
$ docker service create --name registry --publish published=5000,target=5000 registry:2 # create a throwaway registry,
$ docker service ls
$ docker-compose build
$ docker-compose push
$ docker stack deploy --compose-file docker-compose.yml stackdemo
$ docker stack services stackdemo
```

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
