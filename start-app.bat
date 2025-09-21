@echo off
echo 🚀 Starting PayTM App (Fast Mode)...

REM Start MongoDB in Docker (lightweight)
echo 🗄️  Starting MongoDB...
docker run -d -p 27017:27017 --name paytm-mongo mongo:5

REM Wait for MongoDB
echo ⏳ Waiting for MongoDB...
timeout /t 3 /nobreak >nul

REM Start Backend
echo 🔧 Starting Backend...
cd backend
start "Backend" cmd /k "npm install && npm run dev"

REM Wait for backend
echo ⏳ Waiting for Backend...
timeout /t 5 /nobreak >nul

REM Start Frontend
echo 🎨 Starting Frontend...
cd ..\frontend
start "Frontend" cmd /k "npm install && npm run dev"

echo ✅ PayTM App is running!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:3000
echo 🗄️  Database: MongoDB Atlas
echo.
echo Press any key to stop MongoDB...
pause >nul

REM Clean up
docker stop paytm-mongo
docker rm paytm-mongo
