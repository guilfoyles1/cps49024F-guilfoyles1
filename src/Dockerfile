# syntax=docker/dockerfile:1
FROM node:23.1.0
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle the app source
COPY . .
# Just for CPS490
RUN echo "Creating a Docker image by guilfoyles1@udayton.edu"
# the command to execute the app 
CMD [ "npm", "start" ]