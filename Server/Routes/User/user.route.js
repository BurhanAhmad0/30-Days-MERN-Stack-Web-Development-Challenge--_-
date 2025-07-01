const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../../Models/User/user.model')

const authMiddleware = require('../../Middlewares/authMiddleware')
const validateUser = require('../../Middlewares/validateUser')

router.post('/register', validateUser, async (req, res) => {
    try {
        const { username, email, password, userRole, StreetAddress, Apartment, PostCode } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            user_role: userRole || 'user', // Default to 'user' if not provided
            user_address: {
                StreetAddress,
                Apartment,
                PostCode
            }
        });

        const checkSuccess = await newUser.save();

        if (!checkSuccess) {
            return res.status(500).send({ message: 'Failed to register user' });
        }

        const JWT_TOKEN = jwt.sign({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            user_address: newUser.user_address
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('SESSION_TOKEN', JWT_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.send({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
})

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const JWT_TOKEN = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            user_address: user.user_address
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('SESSION_TOKEN', JWT_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.send({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
})

router.put('/register/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;
        const { username, email, user_address } = req.body;
        const { StreetAddress, Apartment, PostCode } = user_address;

        const user = await User.findByIdAndUpdate(userId, {
            username,
            email,
            user_address: {
                StreetAddress,
                Apartment,
                PostCode
            }
        }, { new: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'User updated successfully' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
})

router.delete('/register/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.clearCookie('SESSION_TOKEN', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        res.send({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const findUser = await User.findById(user.id);
    if (!findUser) {
        return res.status(404).send({ message: 'User not found' });
    }

    res.send({
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        user_address: findUser.user_address
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('SESSION_TOKEN', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.send({ message: 'Logged out successfully' });
});


module.exports = router
