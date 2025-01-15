# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the Auth service source code into the container
COPY ./apps/auth ./apps/auth

# Set the working directory for the Auth service
WORKDIR /usr/src/app/apps/auth

# Expose the port the Auth service listens on
EXPOSE 3000

# Start the Auth service
CMD ["npm", "run", "start", "auth"]
