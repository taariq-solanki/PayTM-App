# PayTM Clone - Full Stack Application

A modern, responsive PayTM clone built with React, Node.js, Express, and MongoDB. Features user authentication, account management, and money transfer functionality.

## 🚀 Features

- **User Authentication**: Secure signup and signin with JWT tokens
- **Account Management**: View account balance and user information
- **Money Transfer**: Send money to other users
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Real-time Updates**: Live balance updates
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading indicators for better UX

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recoil** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Zod** - Schema validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for production
- **AWS ECS** - Container orchestration (deployment)

## 📁 Project Structure

```
payTM-App/
├── backend/
│   ├── routes/           # API routes
│   ├── config.js         # Configuration
│   ├── db.js            # Database connection
│   ├── index.js         # Main server file
│   ├── Dockerfile       # Backend container
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── atoms/       # Recoil state atoms
│   │   └── config.js    # Frontend configuration
│   ├── Dockerfile       # Frontend container
│   ├── nginx.conf       # Nginx configuration
│   └── package.json     # Frontend dependencies
├── docker-compose.yml   # Local development setup
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- MongoDB (for local development)

### Local Development with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd payTM-App
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

### Local Development without Docker

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **MongoDB Setup**
   - Install MongoDB locally
   - Start MongoDB service
   - Create a database named `paytm`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/paytm

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Frontend Configuration

The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:3000`
- **Production**: Uses your deployed backend URL

## 📱 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login

### Account
- `GET /api/v1/account/balance` - Get account balance
- `POST /api/v1/account/transfer` - Transfer money

### Health Check
- `GET /api/v1/test` - API health check

## 🐳 Docker Commands

### Build and Run
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Services
```bash
# Build backend only
docker build -t paytm-backend ./backend

# Build frontend only
docker build -t paytm-frontend ./frontend

# Run MongoDB only
docker run -d -p 27017:27017 --name paytm-mongo mongo:5
```

## 🚀 Deployment

### AWS ECS Deployment

1. **Build and push images to ECR**
   ```bash
   # Build backend
   docker build -t paytm-backend ./backend
   docker tag paytm-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/paytm-backend:latest
   docker push <account>.dkr.ecr.<region>.amazonaws.com/paytm-backend:latest

   # Build frontend
   docker build -t paytm-frontend ./frontend
   docker tag paytm-frontend:latest <account>.dkr.ecr.<region>.amazonaws.com/paytm-frontend:latest
   docker push <account>.dkr.ecr.<region>.amazonaws.com/paytm-frontend:latest
   ```

2. **Update task definition**
   - Use the provided `paytm-task.json` as a template
   - Update image URIs with your ECR repository URLs
   - Configure environment variables for production

3. **Deploy to ECS**
   ```bash
   aws ecs register-task-definition --cli-input-json file://paytm-task.json
   aws ecs create-service --cluster <cluster-name> --service-name paytm-service --task-definition paytm-task
   ```

### Environment Variables for Production

Set these environment variables in your ECS task definition:

```json
{
  "environment": [
    {
      "name": "MONGO_URI",
      "value": "mongodb://your-mongodb-atlas-connection-string"
    },
    {
      "name": "JWT_SECRET",
      "value": "your-production-jwt-secret"
    },
    {
      "name": "NODE_ENV",
      "value": "production"
    }
  ]
}
```

## 🧪 Testing

### Manual Testing

1. **Sign Up**
   - Navigate to http://localhost
   - Click "Sign Up"
   - Fill in the form and submit
   - Should redirect to dashboard

2. **Sign In**
   - Use existing credentials
   - Should redirect to dashboard

3. **Dashboard**
   - View account balance
   - See user information
   - Access user list

4. **Send Money**
   - Navigate to send money page
   - Enter recipient and amount
   - Complete transaction

### API Testing

```bash
# Test API health
curl http://localhost:3000/api/v1/test

# Test signup
curl -X POST http://localhost:3000/api/v1/user/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123","firstname":"Test","lastname":"User"}'

# Test signin
curl -X POST http://localhost:3000/api/v1/user/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123"}'
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords are hashed before storage
- **CORS Protection**: Configured CORS for cross-origin requests
- **Input Validation**: Server-side validation with Zod
- **Error Handling**: Comprehensive error handling without data leaks
- **Non-root Containers**: Docker containers run as non-root users

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Loading States**: Smooth loading indicators
- **Error Messages**: User-friendly error messages
- **Success Feedback**: Clear success notifications
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in environment variables
   - Check network connectivity

2. **Frontend Not Loading**
   - Check if backend is running on port 3000
   - Verify API_BASE_URL in frontend config
   - Check browser console for errors

3. **Docker Build Fails**
   - Check Dockerfile syntax
   - Verify all required files are present
   - Check Docker daemon is running

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear localStorage and try again

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- PayTM for inspiration
- React and Node.js communities
- Tailwind CSS for the amazing utility classes
- MongoDB for the flexible database solution

---

**Happy Coding! 🚀**