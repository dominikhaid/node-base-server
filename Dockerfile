FROM node:13
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY deamon.json /etc/docker/daemon.json

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 80

CMD [ "node", "./server.js" ]
#docker build -t appname .
#docker run --name containername -p 80:80 appname