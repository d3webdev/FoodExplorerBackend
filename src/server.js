require('express-async-errors');
require('dotenv').config();

const AppError = require('./utils/AppError');
const cors = require('cors');
const express = require('express');
const uploadConfig = require('./configs/upload');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_DEV_URL = process.env.FRONTEND_DEV_URL;
const origins =
    process.env.NODE_ENV === 'development'
        ? [FRONTEND_URL, FRONTEND_DEV_URL]
        : [FRONTEND_URL];

const app = express();

app.use(
    cors({
        origin: origins,
        credentials: true,
        preflightContinue: false,
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(express.json());
app.use('/image', express.static(uploadConfig.UPLOAD_FOLDER));
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    } else {
        console.error(error);
        return res.status(500).json({
            status: '500',
            message: 'Internal Server Error',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
