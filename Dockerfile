# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# 🔥 Tambahkan generate Prisma
RUN npx prisma generate

# Build the Next.js app
RUN npm run build


# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Only production deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy necessary build outputs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma   

# Runtime env
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
