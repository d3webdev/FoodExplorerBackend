const AppError = require('../../utils/AppError');

class SessionsDeleteService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id, role, email) {
        const user = await this.userRepository.findById(id);

        if (user.email !== email && role !== 'admin') {
            throw new AppError('Invalid request', 400);
        }

        const cookieOptions = {
            httpOnly: true,
            sameSite: 'None',
            partitioned: true,
            secure: true,
        };

        return cookieOptions;
    }
}

module.exports = SessionsDeleteService;
