FROM node:14-alpine 

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Europe/Zurich /etc/localtime
RUN echo "Europe/Zurich" >  /etc/timezone
RUN mkdir /home/node/app/ && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node src ./src/

USER node
RUN npm install && npm cache clean --force --loglevel=error

EXPOSE 3000
CMD [ "node", "src/index.js" ]