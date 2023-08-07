# Use a base image with Node.js
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the proxy API code to the container
COPY package*.json ./
RUN npm install
COPY . .

# Expose the port the proxy API will listen on
EXPOSE 3000

# Start the proxy API
CMD ["npm", "start"]
