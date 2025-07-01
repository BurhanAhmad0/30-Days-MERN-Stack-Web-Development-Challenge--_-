const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.SESSION_TOKEN;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
