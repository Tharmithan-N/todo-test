# Use official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend source code to the container
COPY . .

# Expose the port React app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
