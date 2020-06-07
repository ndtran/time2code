# setup my VPS

> Ubuntu 20.04 Server LTS

## My Quick Setup

```
$ ssh root@ip_address
```

### check version and update

```
$ lsb_release -a
$ apt-get update
$ apt-get upgrade
```

### add user with sudo role

```
$ adduser username
$ usermod -aG sudo username
$ visudo --> below root add username
```

### fail2ban

```
$ apt install fail2ban
```

### Change port SSH

```
$ grep -i port /etc/ssh/sshd_config
$ sudo vim /etc/ssh/sshd_config
  "#Port 22" to "Port 2244"
  "#PermitRootLogin yes" to "PermitRootLogin no"
$ systemctl restart sshd
```

> ssh -p 2244 username@ip_address

### install fish

```
$ sudo apt-get install fish
$ curl -L https://get.oh-my.fish | fish
$ omf install sushi
$ omf install z
```

### install docker

```
$ sudo apt install docker.io
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ docker --version
```

### install docker-compose

```
$ sudo apt install docker-compose
$ docker-compose --version
$ docker-compose up -d --build
```

###

---

# INFO

## SSH

### version

```
ssh -V
```

### service:

```
$ sudo service ssh start
$ sudo service ssh stop
$ sudo service ssh restart
```

### remote access

```
ssh <nom_utilisateur>@<ipaddress> -p <num_port>
ssh -6 <nom_utilisateur>@<adresse ipv6>
```

### scp -> transfer: (from → to)

```
scp <fichier> <username>@<ipaddressDistant>:<DestinationDirectory>
scp <username>@<ipaddressDistant>:<DistantDirectory> <LocalDirectory>
```

> scp -P 2242 monkey@192.168.1.30:download/toto.txt Desktop/

```
-r : répertoire
-P : port
```

### passwordless:

```
ssh-keygen -t rsa -b 2048
ssh-copy-id -i ~/.ssh/id_rsa.pub -p <num_port> "<username>@<ipaddress>"
```

### Setting up the tunnel: (tunnel on port 8080)

```
$ ssh -2NfCT -D PORT USERNAME@IP_ADDRESS -p PORT
```

> ssh -2NfCT -D 8080 monkey@192.168.1.30 -p 2242

```
-D: Tells SSH that we want a SOCKS tunnel on the specified port number
-f: Forks the process to the background
-C: Compresses the data before sending it
-N: Tells SSH that no command will be sent once the tunnel is up
-q: Uses quiet mode
```

## DOCKER

### checking

```
$ docker ps
$ docker images ls
$ docker container ls
$ docker service ls
$ docker stack ls
```

### clean docker:

```
$ docker container stop $(docker container ls -a -q) && docker system prune -a -f --volumes
https://docs.docker.com/engine/swarm/key-concepts/
$ docker service rm  ...
$ docker stack rm ...
```

### docker managment

```
$ docker volume create portainer_data
$ docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

## CRON

```
$ crontab -l  // get list
$ crontab -e  // edit list
```

## RSYNC

[TBD]

## UPGRADE LSB UBUNTU

[TBD]

---

# INFO WINDOWS 10 (using WSL)

## install nodeJS

```
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ apt-get install -y nodejs
$ node --version
```

## install fish

```
$ sudo apt-add-repository ppa:fish-shell/release-2
$ sudo apt-get update
$ sudo apt-get install fish
```

## install yarn

```
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt update
$ sudo apt install yarn (if using nvm: sudo apt install --no-install-recommends yarn)
$ yarn --version
```

---

# License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
