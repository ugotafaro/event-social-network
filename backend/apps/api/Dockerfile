# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the API service source code into the container
COPY ./apps/api ./apps/api

# Set the working directory for the API service
WORKDIR /usr/src/app/apps/api

# Expose the port the API service listens on
EXPOSE 4000

# Start the API service
CMD ["npm", "run", "start:dev", "api"]
