FROM node:20

WORKDIR /app

# Copy dependencies first
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
