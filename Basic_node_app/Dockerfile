FROM node:20-alpine
# Set the working directory

RUN mkdir node
WORKDIR /node
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]