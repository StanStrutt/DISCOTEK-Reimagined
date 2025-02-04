# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /DISCOTEK Reimagined

# Copy the app package and package-lock.json file
COPY package*.json ./
RUN npm install --only=production

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Expose the application port
EXPOSE 3000

# Start the app using serve command
CMD [ "node", "App.tsx" ]