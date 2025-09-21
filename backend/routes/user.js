const express = require('express');
const { userValid } = require('../schema');
const { User, UserAccount } = require('../db');
const jwtSecret = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

const userRouter = new express.Router();

// Signup
userRouter.post('/signup', async (req, res) => {
    try {
        const userInfo = req.body;
        const validity = userValid.safeParse(userInfo);
        if (!validity.success) return res.json({ msg: "invalid inputs" });

        const existingUser = await User.findOne({ username: userInfo.username });
        if (existingUser) return res.json({ msg: "user already exists" });

        const user = await User.create({
            username: userInfo.username,
            password: userInfo.password,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
        });

        await UserAccount.create({
            userId: user._id,
            balance: 1000 // Default balance for new users
        });

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.status(200).json({ msg: "user created", token });
    } catch {
        res.status(400).json({ msg: "something went wrong" });
    }
});

// Signin
userRouter.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            // Ensure user has an account
            let account = await UserAccount.findOne({ userId: existingUser._id });
            if (!account) {
                // Create account if it doesn't exist
                account = await UserAccount.create({
                    userId: existingUser._id,
                    balance: 1000 // Default balance for new accounts
                });
            }
            
            const token = jwt.sign({ userId: existingUser._id }, jwtSecret);
            return res.status(200).json({ token, msg: "signin done" });
        }
        res.status(411).json({ msg: "error while logging in" });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ msg: "something went wrong" });
    }
});

// Update user
userRouter.put('/', authMiddleware, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.userId }, req.body);
        res.json({ msg: "Updated successfully" });
    } catch {
        res.status(411).json({ msg: "Error while updating information" });
    }
});

// Get current user info
userRouter.post('/me', authMiddleware, async (req, res) => {
    res.status(200).json({});
});

// Bulk user search
userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({ $or: [{ firstname: { "$regex": filter } }, { lastname: filter }] });
        res.json({
            users: users.map(i => ({
                firstname: i.firstname,
                lastname: i.lastname,
                username: i.username,
                _id: i._id
            }))
        });
    } catch {
        res.json({ msg: "user not found" });
    }
});

module.exports = userRouter;
