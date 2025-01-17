const AppError = require('../../utils/AppError');

class UserListService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(role) {
        const users = await this.userRepository.findAll(role);

        if (users.length === 0) {
            throw new AppError('Users not found', 404);
        }

        return users;
    }
}

module.exports = UserListService;
