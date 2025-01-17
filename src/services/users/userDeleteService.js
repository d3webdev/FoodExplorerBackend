const AppError = require('../../utils/AppError');

class UserRemoveService {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
    }

    async execute(user_id, role, { id }) {
        const user = await this.userRepositories.findById(id);

        if (role == 'admin' && user_id == id) {
            throw new AppError('Admin cannot remove own account', 401);
        }

        if (!user) {
            throw new AppError('User not found');
        }

        try {
            await this.userRepositories.remove(id);
        } catch (error) {
            throw new Error(error, 500);
        }

        return 'User removed successfully';
    }
}

module.exports = UserRemoveService;
