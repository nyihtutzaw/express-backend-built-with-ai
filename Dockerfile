# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create data directory for SQLite
RUN mkdir -p data

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]