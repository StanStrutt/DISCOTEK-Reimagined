# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port React will run on
EXPOSE 3001

# Serve the React app
CMD ["node", "server.js"]