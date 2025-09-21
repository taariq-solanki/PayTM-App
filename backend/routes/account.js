const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { UserAccount, db, User } = require("../db");
const mongoose = require('mongoose');

const accountRouter = Router();

// Get balance
accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await UserAccount.findOne({ userId });
    const user = await User.findOne({ _id: userId });

    res.json({
        balance: account.balance,
        firstname: user.firstname,
        lastname: user.lastname
    });
});

// Transfer money
accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const transferInfo = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        // Find receiver by username
        const receiver = await User.findOne({ username: transferInfo.to }).session(session);
        if (!receiver) {
            await session.abortTransaction();
            return res.json({ msg: "invalid account" });
        }

        const receiverStatus = await UserAccount.findOne({ userId: receiver._id }).session(session);
        if (!receiverStatus) {
            await session.abortTransaction();
            return res.json({ msg: "invalid account" });
        }

        const senderStatus = await UserAccount.findOne({ userId: req.userId }).session(session);
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

module.exports = { accountRouter };
