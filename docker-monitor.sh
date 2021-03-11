#!/bin/bash

LOGS_DIR=./performance
containerName=kristi-test-msg-redis

if [ ! -d ${LOGS_DIR} ]
then
    mkdir ${LOGS_DIR}
fi

while true
do
 #time,memory
 FILE="${LOGS_DIR}/$(date +%F).log"
 echo -e "$(date +%s),$(docker stats --no-stream $containerName  | grep $containerName | awk '{print $4}')" >> $FILE
 sleep 1;
done
