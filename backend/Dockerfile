FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000

# Run as non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

CMD ["npm", "start"]