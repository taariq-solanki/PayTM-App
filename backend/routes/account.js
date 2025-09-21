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

// Transfer money
accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const transferInfo = req.body;
        
        // Validate input
        if (!transferInfo.to || !transferInfo.amount) {
            return res.status(400).json({ msg: "missing required fields" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        // Find receiver by username (email)
        console.log('Looking for recipient:', transferInfo.to);
        const receiver = await User.findOne({ username: transferInfo.to }).session(session);
        console.log('Receiver found:', receiver ? 'Yes' : 'No');
        
        if (!receiver) {
            await session.abortTransaction();
            return res.json({ msg: "recipient not found" });
        }

        // Find or create receiver account
        let receiverStatus = await UserAccount.findOne({ userId: receiver._id }).session(session);
        if (!receiverStatus) {
            // Create account for receiver if it doesn't exist
            receiverStatus = await UserAccount.create([{
                userId: receiver._id,
                balance: 1000 // Default balance for new accounts
            }], { session });
            receiverStatus = receiverStatus[0];
        }

        // Find or create sender account
        let senderStatus = await UserAccount.findOne({ userId: req.userId }).session(session);
        if (!senderStatus) {
            // Create account for sender if it doesn't exist
            senderStatus = await UserAccount.create([{
                userId: req.userId,
                balance: 1000 // Default balance for new accounts
            }], { session });
            senderStatus = senderStatus[0];
        }
        if (senderStatus.balance < transferInfo.amount) {
            await session.abortTransaction();
            return res.json({ msg: "insufficient balance" });
        }

        await UserAccount.updateOne({ userId: req.userId }, { $inc: { balance: -transferInfo.amount } }).session(session);
        await UserAccount.updateOne({ userId: receiver._id }, { $inc: { balance: transferInfo.amount } }).session(session);

        await session.commitTransaction();
        res.json({ msg: "transaction successful" });
    } catch (error) {
        console.error('Transfer error:', error);
        res.status(500).json({ msg: "something went wrong" });
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

module.exports = { accountRouter };
