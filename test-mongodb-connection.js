const mongoose = require('mongoose');

// Test MongoDB connection
const mongoUrl = "mongodb+srv://paytmUser:Npy0g2KNFDXo9xHy@paytmcluster.tqln6ay.mongodb.net/paytm?retryWrites=true&w=majority&appName=PaytmCluster";

console.log('🔍 Testing MongoDB connection...');
console.log('📊 Connection string (masked):', mongoUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
    bufferMaxEntries: 0
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    
    // Test a simple operation
    return mongoose.connection.db.admin().ping();
})
.then(() => {
    console.log('✅ Database ping successful!');
    process.exit(0);
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('🔍 Error details:', {
        name: err.name,
        message: err.message,
        code: err.code
    });
    process.exit(1);
});
