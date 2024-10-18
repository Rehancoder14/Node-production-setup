#using lightweight docker image for node
FROM node:20-alpine AS base 

# setting working directory
WORKDIR /usr/src/backend-app

#copying Package files
COPY package*.json ./

#installing dependencies
RUN npm ci

#copying files
COPY . .

#expose port 3000
EXPOSE 3000

#starting app
CMD ["npm", "run", "dev"]