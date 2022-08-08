FROM node
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install
