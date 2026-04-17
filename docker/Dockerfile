# =====================================================
# JUSTDEFENDERS PRODUCTION DOCKER IMAGE
# Timestamp: 27 Feb 2026 09:10
# =====================================================

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy full source
COPY . .

# Build Next.js app
RUN npm run build

# Expose Next port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]