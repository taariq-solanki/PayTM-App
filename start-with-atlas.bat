@echo off
echo 🚀 Starting PayTM App with MongoDB Atlas...

REM Start Backend with Atlas
echo 🔧 Starting Backend with Atlas connection...
cd backend
set MONGO_URI=mongodb+srv://paytmUser:Npy0g2KNFDXo9xHy@paytmcluster.tqln6ay.mongodb.net/paytm?retryWrites=true&w=majority&appName=PaytmCluster
set JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
set NODE_ENV=development
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

echo ✅ PayTM App is running with MongoDB Atlas!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:3000
echo 🗄️  Database: MongoDB Atlas (PaytmCluster)
echo.
echo Press any key to exit...
pause >nul
