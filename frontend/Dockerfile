# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight HTTP server (optional, but useful)
RUN npm install -g serve

# Expose the port React will run on
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]