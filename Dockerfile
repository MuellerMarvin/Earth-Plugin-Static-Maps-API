# Use the official Node.js image as a parent image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Start a new stage to have a clean image without the devDependencies
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the built files and package.json from the build stage
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "start:prod"]
