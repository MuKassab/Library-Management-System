FROM node:20.9.0

# Set the working directory in the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of your application code
COPY . .

# Install app dependencies
RUN npm install

# Expose the port on which your app will run
EXPOSE 3500

# Specify the command to run on container startup
CMD ["npm", "start"]