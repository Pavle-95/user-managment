// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Adjust path as necessary

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
        req.user = await User.findByPk(decoded.id); // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission to perform this action.' });
        }
        next(); // Proceed to the next middleware or route handler
    };
};

module.exports = { authenticate, authorize };