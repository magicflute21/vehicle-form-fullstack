FROM node:18-alpine AS build

# Install necessary build dependencies
RUN apk add --no-cache python3 make g++

ENV VITE_API_URL=http://backend:8080

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Clean install with force and explicit platform
RUN npm cache clean --force
RUN npm install --force --platform=linux --arch=x64 --include=dev

# Explicitly install Rollup native bindings
RUN npm install @rollup/rollup-linux-x64-musl

# Copy the rest of the project
COPY . .

# Rebuild optional dependencies
RUN npm rebuild

# Build the project
RUN npm run build

# Final stage with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]