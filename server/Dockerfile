# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your server listens on
EXPOSE 8080

# Define the command to run your server
CMD [ "node", "app.js" ]
