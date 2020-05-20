FROM alpine

RUN apk add --no-cache bash
RUN apk add --no-cache curl
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Europe/Zurich /etc/localtime
RUN echo "Europe/Zurich" >  /etc/timezone
WORKDIR /time2sport
COPY crontab.txt ./crontab.txt
COPY time2sport.sh ./time2sport.sh
COPY entrypoint.sh ./entrypoint.sh
RUN chmod 755 ./entrypoint.sh ./entrypoint.sh
RUN /usr/bin/crontab ./crontab.txt

CMD ["./entrypoint.sh"]

# change timezone https://wiki.alpinelinux.org/wiki/Setting_the_timezone