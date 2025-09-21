# MongoDB Atlas Setup Guide

## 1. Create .env file in backend directory

Create a file named `.env` in the `backend` folder with the following content:

```env
# MongoDB Atlas Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/paytm?retryWrites=true&w=majority

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 2. Get your Atlas connection string

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<cluster-url>` with your actual values

## 3. Example connection string format

```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/paytm?retryWrites=true&w=majority
```

## 4. Network Access

Make sure to add your IP address to the Atlas network access list:
- Go to Network Access in Atlas
- Add your current IP address
- For production, add 0.0.0.0/0 (all IPs) or your AWS IP ranges

## 5. Database User

Create a database user in Atlas:
- Go to Database Access
- Add a new user with read/write permissions
- Use these credentials in your connection string

## 6. Start the application

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

The app will automatically connect to your Atlas database!
