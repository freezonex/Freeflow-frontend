# Stage 1: Building the app
FROM node:21.1.0 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Set the environment variable and build your Next.js app

RUN npm run build

# Stage 2: Running the app in production
FROM node:21.1.0

# Set the working directory
WORKDIR /app

# Copy package.json and other necessary files
# Specifically, we copy only the dependencies required for production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.local ./

# Use shell commands to conditionally copy the public directory if it exists
# RUN if [ -d /app/public ]; then cp -R /app/public ./public; fi

# Install only production dependencies
RUN npm install --only=production

# Your app binds to port 3000 by default, expose it
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
