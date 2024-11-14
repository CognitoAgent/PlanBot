# Step 1: Use an official Node.js image to build the React app
FROM node:16 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install all dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY public/ src/ .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use an Nginx image to serve the React app
FROM nginx:alpine

# Step 8: Copy the build directory from the previous stage into the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port that Nginx will serve the app from
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]