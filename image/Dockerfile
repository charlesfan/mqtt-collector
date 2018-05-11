# Losen-mqtt-collector image
FROM node:latest
MAINTAINER Charles <charles.fan@liteon.com>
RUN apt-get -qq update
RUN apt-get -qqy install git
RUN git clone https://github.com/charlesfan/mqtt-collector.git
RUN cd mqtt-collector && npm install
# Set ENV from ARG
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG BROKER_HOST
ARG MQTT_PUB_INTERVAL
ENV DB_HOST=${DB_HOST} 
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER} 
ENV DB_PASSWORD=${DB_PASSWORD} 
ENV BROKER_HOST=${BROKER_HOST}
ENV MQTT_PUB_INTERVAL=${MQTT_PUB_INTERVAL}
# Run
CMD ["node", "/mqtt-collector/app.js"]
