const UserRepositories = require('../repositories/userRepositories');
const UserCreateService = require('../services/users/userCreateService');
const UserListService = require('../services/users/userListService');
const UserDeleteService = require('../services/users/userDeleteService');
const UserUpdateService = require('../services/users/userUpdateService');

class UsersController {
    async create(req, res) {
        const userRepositories = new UserRepositories();
        const userCreateService = new UserCreateService(userRepositories);

        const { name, email, password } = req.body;

        await userCreateService.execute({
            name,
            email,
            password,
        });

        return res.status(201).json('User created successfully');
    }

    async index(req, res) {
        const { list } = req.params;
        const userRepositories = new UserRepositories();
        const userListService = new UserListService(userRepositories);

        const users = await userListService.execute(list);

        return res.status(200).json(users);
    }

    async delete(req, resp) {
        const userRepositories = new UserRepositories();
        const userDeleteService = new UserDeleteService(userRepositories);

        const { id } = req.params;
        const { id: user_id, role } = req.user;

        await userDeleteService.execute(user_id, role, { id });

        return resp.status(200).json('User deleted successfully');
    }

    async update(req, res) {
        const { id: user_id, role } = req.user;
        const userRepositories = new UserRepositories();
        const userUpdateService = new UserUpdateService(userRepositories);

        const { id, name, email, password, oldPassword } = req.body;

        await userUpdateService.execute(user_id, role, {
            id,
            name,
            email,
            password,
            oldPassword,
        });

        return res.status(200).json('User updated successfully');
    }
}

module.exports = UsersController;
