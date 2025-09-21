@echo off
echo 🚀 Starting PayTM App in Development Mode...

REM Stop any existing containers
echo 📦 Stopping existing containers...
docker-compose down 2>nul

REM Start MongoDB
echo 🗄️  Starting MongoDB...
docker run -d -p 27017:27017 --name paytm-mongo mongo:5

REM Wait for MongoDB to start
echo ⏳ Waiting for MongoDB to start...
timeout /t 5 /nobreak >nul

REM Start Backend
echo 🔧 Starting Backend...
cd backend
call npm install
start "Backend" cmd /k "npm run dev"

REM Wait for backend to start
echo ⏳ Waiting for Backend to start...
timeout /t 5 /nobreak >nul

REM Start Frontend
echo 🎨 Starting Frontend...
cd ..\frontend
call npm install
start "Frontend" cmd /k "npm run dev"

echo ✅ PayTM App is running!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:3000
echo 🗄️  MongoDB: localhost:27017
echo.
echo Press any key to stop MongoDB container...
pause >nul

REM Clean up
docker stop paytm-mongo
docker rm paytm-mongo
