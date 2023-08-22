# Use an official Node.js runtime as the base image
FROM ghcr.io/puppeteer/puppeteer:latest

# Set the working directory in the container
USER pptruser
WORKDIR /home/pptruser/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Set the environment variable for Google Cloud Run to listen on port 8080
ENV PORT 8080

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
