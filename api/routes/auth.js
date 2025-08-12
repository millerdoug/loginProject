const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const {username, password, role} = req.body;

    const hashed = await bcrypt.hash(password, 10);
    try {
        const normalizedUsername = username.trim().toLowerCase();
        if (await User.findOne({username: normalizedUsername}) !== null) {
            return res.status(400).json({error: 'Username already exists'});
        }
        await User.create({username: normalizedUsername, password: hashed, role});
        res.status(201).json({message: 'User created'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal System Error'});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const normalizedUsername = username.trim().toLowerCase();
        const user = await User.findOne({username: normalizedUsername});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: 'Invalid username or password'})
        }

        return res.json({username: user.username, role: user.role});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
});

module.exports = router;