# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the entire project to the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Set the environment variable for Google Cloud Run to listen on port 8080
ENV PORT 8080

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

# Start the application
CMD ["npm", "start:prod"]
