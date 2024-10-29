# Stage 1: Build the React app
FROM node:latest-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app using a lightweight web server
FROM nginx:alpine

# Copy the built files from the previous stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
