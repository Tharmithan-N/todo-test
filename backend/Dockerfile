# Use the Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY ./package.json ./package-lock.json /app/

# Install the dependencies
RUN npm install

# Copy the entire project
COPY ./src /app/src
COPY ./prisma /app/prisma

# Run prisma generate to regenerate the client with the correct binary target
RUN npx prisma generate

# Expose the port your app is running on
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
