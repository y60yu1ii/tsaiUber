#!/bin/sh
docker build -t $1 .
docker run -it -p80:$2 $1
