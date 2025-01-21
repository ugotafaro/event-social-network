# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the application port 
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
