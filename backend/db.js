const mongoose = require('mongoose');
require('dotenv').config();

// Use Atlas connection if available, otherwise fallback to local Mongo
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/paytm';

mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('🔍 Connection string (masked):', mongoUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    process.exit(1); // Exit process if DB connection fails
});

// Connection event listeners
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('👋 MongoDB connection closed through app termination');
    process.exit(0);
});

// ✅ User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String
});

// ✅ Account schema
const userAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

// ✅ Models
const User = mongoose.model('User', userSchema);
const UserAccount = mongoose.model('UserAccount', userAccountSchema);

// ✅ Export
module.exports = { User, UserAccount };
