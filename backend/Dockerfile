# Use Node.js version 18
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (helps with caching)
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy all other files
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:5000/health || exit 1

# Start the application
CMD ["npm", "start"]