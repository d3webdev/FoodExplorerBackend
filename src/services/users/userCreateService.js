const AppError = require('../../utils/AppError');
const { hash } = require('bcryptjs');

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.', 400);
        }

        if (!name || !email || !password) {
            throw new AppError('Missing fields', 400);
        }

        const passwordHash = await hash(password, 8);

        const response = await this.userRepository.createUser({
            name,
            email,
            password: passwordHash,
        });

        return response;
    }
}

module.exports = UserCreateService;
