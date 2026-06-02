# 1-bosqich: Build va Dependency o'rnatish
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# 2-bosqich: Faqat kerakli fayllar bilan Production rasmini yig'ish
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["node", "src/app.js"]
