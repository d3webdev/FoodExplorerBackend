const AppError = require('../../utils/AppError');
const { compare, hash } = require('bcryptjs');

class UserUpdateService {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async execute(user_id, role, { id, name, email, password, oldPassword }) {
        const user = await this.userRepositories.findById(id);

        if (role !== 'admin' && user_id !== id) {
            throw new AppError('Unauthorized', 401);
        }

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const checkEmail = await this.userRepositories.findByEmail(email);

        if (checkEmail && checkEmail.id !== id) {
            throw new AppError('e-mail already exists', 400);
        }

        const updateData = {
            id,
            name,
            email,
            updated_at: this.timeNow,
        };

        if (password && !oldPassword) {
            throw new AppError('Old password is required');
        }

        if (password && oldPassword) {
            const checkPassword = await compare(oldPassword, user.password);

            if (!checkPassword) {
                throw new AppError('Old password does not match', 400);
            }

            const passwordHash = await hash(password, 8);

            password && (updateData.password = passwordHash);
        }

        try {
            await this.userRepositories.update(updateData);

            return 'User updated successfully';
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = UserUpdateService;
