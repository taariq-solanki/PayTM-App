const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { UserAccount, db, User } = require("../db");
const mongoose = require('mongoose');

const accountRouter = Router();

// Get balance
accountRouter.get('/balance', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        
        // Find user first
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }

        // Find or create account
        let account = await UserAccount.findOne({ userId });
        if (!account) {
            // Create account with random balance if it doesn't exist
            account = await UserAccount.create({
                userId: userId,
                balance: 1000 // Default balance for new accounts
            });
        }

        res.json({
            balance: account.balance,
            firstname: user.firstname,
            lastname: user.lastname
        });
    } catch (error) {
        console.error('Balance error:', error);
        res.status(500).json({ msg: "something went wrong" });
    }
});

// Transfer money - SIMPLIFIED VERSION
accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const { to, amount } = req.body;
        
        console.log('=== TRANSFER REQUEST ===');
        console.log('From user ID:', req.userId);
        console.log('To:', to);
        console.log('Amount:', amount);
        
        // Validate input
        if (!to || !amount) {
            return res.status(400).json({ msg: "missing required fields" });
        }

        // Find receiver by username
        console.log('Looking for receiver with username:', to);
        const receiver = await User.findOne({ username: to });
        console.log('Receiver found:', receiver ? 'YES' : 'NO');
        
        if (!receiver) {
            // Show all available users for debugging
            const allUsers = await User.find({}, 'username firstname lastname');
            console.log('Available users:', allUsers.map(u => u.username));
            return res.json({ 
                msg: "recipient not found", 
                availableUsers: allUsers.map(u => u.username) 
            });
        }

        // Get or create sender account
        let senderAccount = await UserAccount.findOne({ userId: req.userId });
        if (!senderAccount) {
            senderAccount = await UserAccount.create({
                userId: req.userId,
                balance: 1000
            });
            console.log('Created sender account with balance:', senderAccount.balance);
        }

        // Get or create receiver account
        let receiverAccount = await UserAccount.findOne({ userId: receiver._id });
        if (!receiverAccount) {
            receiverAccount = await UserAccount.create({
                userId: receiver._id,
                balance: 1000
            });
            console.log('Created receiver account with balance:', receiverAccount.balance);
        }

        // Check if sender has enough balance
        if (senderAccount.balance < amount) {
            return res.json({ 
                msg: "insufficient balance", 
                currentBalance: senderAccount.balance,
                requestedAmount: amount 
            });
        }

        // Perform the transfer
        await UserAccount.updateOne(
            { userId: req.userId }, 
            { $inc: { balance: -amount } }
        );
        
        await UserAccount.updateOne(
            { userId: receiver._id }, 
            { $inc: { balance: amount } }
        );

        console.log('Transfer successful!');
        res.json({ 
            msg: "transaction successful",
            from: req.userId,
            to: receiver.username,
            amount: amount
        });

    } catch (error) {
        console.error('Transfer error:', error);
        res.status(500).json({ msg: "something went wrong", error: error.message });
    }
});

// Debug endpoint to list all users (remove in production)
accountRouter.get('/debug/users', async (req, res) => {
    try {
        const users = await User.find({}, 'username firstname lastname');
        res.json({ users });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ msg: "something went wrong" });
    }
});

// Debug endpoint to test user lookup (remove in production)
accountRouter.get('/debug/user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log('Looking for user with username:', username);
        const user = await User.findOne({ username });
        console.log('User found:', user);
        res.json({ 
            username, 
            found: !!user, 
            user: user ? { username: user.username, firstname: user.firstname, lastname: user.lastname } : null 
        });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ msg: "something went wrong" });
    }
});

// Test endpoint to create test users (remove in production)
accountRouter.post('/debug/create-test-users', async (req, res) => {
    try {
        // Create test users
        const testUsers = [
            { username: 'test1@example.com', password: 'password123', firstname: 'Test', lastname: 'User1' },
            { username: 'test2@example.com', password: 'password123', firstname: 'Test', lastname: 'User2' }
        ];

        const createdUsers = [];
        for (const userData of testUsers) {
            // Check if user already exists
            let user = await User.findOne({ username: userData.username });
            if (!user) {
                user = await User.create(userData);
                await UserAccount.create({
                    userId: user._id,
                    balance: 1000
                });
                createdUsers.push({ username: user.username, created: true });
            } else {
                createdUsers.push({ username: user.username, created: false, message: 'already exists' });
            }
        }

        res.json({ message: 'Test users created', users: createdUsers });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ msg: "something went wrong" });
    }
});

module.exports = { accountRouter };
