const AppError = require('../utils/AppError');
const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.cookie;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split('token=');

    try {
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

        req.user = {
            id: Number(user_id),
            role,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}

module.exports = ensureAuthenticated;
