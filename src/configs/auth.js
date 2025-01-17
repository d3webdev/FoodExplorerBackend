module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || '51f419b1f051854abd6b2e56300244a4',
        expiresIn: process.env.AUTH_EXPIRES || '1d',
    },
};
