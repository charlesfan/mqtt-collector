# mqtt-collector
```
node app.js -i <interval> -h <address of broker>
```

#### Create docker image
```
$ cd <PROJECT_PATH>/image
$ docker build -t="liteon/mqtt-collector:0.0.1" .
```
#### Run in docker
```
$ docker run --name mqtt-test -e DB_HOST=<address> -e DB_PASSWORD=<password> -e DB_USER=<user> -e BROKER_HOST=<ip> -e MQTT_PUB_INTERVAL=<ms> -d liteon/mqtt-collector:0.0.1
```

#### Create image with env
```
$ cd <PROJECT_PATH>/image
$ docker build -t="liteon/mqtt-collector:0.01" --build-arg DB_HOST=<ip> --build-arg DB_PASSWORD=<password> --build-arg DB_USER=<user> --build-arg BROKER_HOST=<ip> --build-arg MQTT_PUB_INTERVAL=<ms>.
```
