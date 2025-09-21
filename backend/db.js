const mongoose = require('mongoose');
require('dotenv').config();

// Use Atlas connection if available, otherwise fallback to local Mongo
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/paytm';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

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
