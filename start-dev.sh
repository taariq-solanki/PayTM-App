#!/bin/bash

echo "🚀 Starting PayTM App in Development Mode..."

# Stop any existing containers
echo "📦 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Start MongoDB
echo "🗄️  Starting MongoDB..."
docker run -d -p 27017:27017 --name paytm-mongo mongo:5

# Wait for MongoDB to start
echo "⏳ Waiting for MongoDB to start..."
sleep 5

# Start Backend
echo "🔧 Starting Backend..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for Backend to start..."
sleep 5

# Start Frontend
echo "🎨 Starting Frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "✅ PayTM App is running!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:3000"
echo "🗄️  MongoDB: localhost:27017"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
