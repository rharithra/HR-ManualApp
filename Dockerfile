# Multi-stage Docker build for HR Manual App

# Stage 1: Build Backend
FROM maven:3.8-openjdk-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 3: Production Image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy backend JAR
COPY --from=backend-build /app/backend/target/hr-manual-app-1.0.0.jar ./app.jar

# Copy frontend build
COPY --from=frontend-build /app/frontend/build ./static

# Install nginx for serving frontend
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy nginx configuration
COPY <<EOF /etc/nginx/sites-available/default
server {
    listen 80;
    
    # Serve React frontend
    location / {
        root /app/static;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Proxy API requests to Spring Boot
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Expose ports
EXPOSE 80 8080

# Start script
COPY <<EOF /app/start.sh
#!/bin/bash
# Start nginx
nginx &

# Start Spring Boot application
java -jar app.jar
EOF

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
