const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../../configs/auth');
const AppError = require('../../utils/AppError');

class SessionsCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }) {
        if (!email || !password) {
            throw new AppError('Missing fields', 400);
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('E-mail e/ou senha incorreta', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('E-mail e/ou senha incorreta', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const duration = process.env.COOKIE_MAX_AGE || '1h';
        const timeUnit = duration.slice(-1);
        const timeValue = parseInt(duration.slice(0, -1), 10);

        let maxAge_data;
        switch (timeUnit) {
            case 'm':
                maxAge_data = timeValue;
                break;
            case 'h':
                maxAge_data = timeValue * 60;
                break;
            case 'd':
                maxAge_data = timeValue * 60 * 24;
                break;
            default:
                maxAge_data = 60;
        }

        const maxAge = maxAge_data * 60 * 1000 || 10 * 60 * 1000;

        const token = sign({ role: user.role }, secret, {
            subject: String(user.id),
            expiresIn,
        });

        const cookieOptions = {
            httpOnly: true,
            sameSite: 'None',
            partitioned: true,
            secure: true,
            maxAge,
        };

        delete user.password;

        return { user, token, cookieOptions };
    }
}

module.exports = SessionsCreateService;
