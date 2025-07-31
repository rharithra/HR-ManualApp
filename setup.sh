#!/bin/bash

echo "🚀 HR Manual App - Quick Setup"
echo "================================"

# Check if we're in a Codespace or local environment
if [ "$CODESPACES" = "true" ]; then
    echo "✅ Running in GitHub Codespaces"
    
    # Backend setup
    echo "🔧 Setting up backend..."
    cd backend
    chmod +x mvnw
    
    # Create a simple firebase config placeholder
    mkdir -p src/main/resources
    echo '{"type": "service_account", "project_id": "demo"}' > src/main/resources/firebase-config.json
    
    # Start backend in background
    echo "🚀 Starting backend server..."
    nohup ./mvnw spring-boot:run > backend.log 2>&1 &
    echo "Backend started on port 8080"
    
    # Frontend setup
    echo "🎨 Setting up frontend..."
    cd ../frontend
    
    # Install dependencies
    npm install
    
    # Start frontend
    echo "🚀 Starting frontend server..."
    npm start &
    echo "Frontend started on port 3000"
    
    echo "✅ Setup complete!"
    echo "🌐 Frontend: https://$CODESPACE_NAME-3000.app.github.dev"
    echo "🔗 Backend API: https://$CODESPACE_NAME-8080.app.github.dev"
    
else
    echo "💡 For local development, please use GitHub Codespaces or deploy to Railway/Render"
    echo "🔗 GitHub Codespaces: https://github.com/codespaces"
    echo "🔗 Railway: https://railway.app"
    echo "🔗 Render: https://render.com"
fi 