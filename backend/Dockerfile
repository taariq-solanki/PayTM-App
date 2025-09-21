# Use Node.js 20 as base image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy only package.json and package-lock.json first (better layer caching)
COPY package*.json ./

# Install dependencies (dotenv will be installed if it's in package.json)
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# Expose app port
EXPOSE 3000

# Run the backend (better than npm run dev for production)
CMD ["node", "index.js"]
