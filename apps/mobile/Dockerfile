# Using Node.js 20 as the base image
FROM node:20.16.0

# Set the working directory
WORKDIR /app

# Granting permissions to the working directory
RUN chmod -R 755 /app

# Installing corepack to manage yarn versions and enabling it
RUN npm install -g corepack
RUN corepack enable

# Installing Yarn 4.3.1
RUN corepack prepare yarn@4.3.1 --activate

# Installing xdg-utils to handle URL openings
RUN apt-get update && apt-get install -y xdg-utils

# Copy dependency files
COPY package.json yarn.lock turbo.json ./
COPY apps/mobile/package.json ./apps/mobile/
COPY packages ./packages

# Copy the application code
COPY apps/mobile ./apps/mobile

# Use yarn dlx to run expo commands
RUN yarn dlx expo-cli --version

# Install dependencies
RUN yarn install

# Install missing Expo dependency
RUN yarn add @expo/metro-runtime

# Exposing port 8081 for Metro Bundler
EXPOSE 8081

# Command to start Expo in development mode
CMD ["yarn", "run", "dev"]