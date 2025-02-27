const repositories = require('../repositories');
const UserRepositories = require('../repositories/userRepositories');
const SessionsCreateService = require('../services/sessions/sessionsCreateService');
const SessionsDeleteService = require('../services/sessions/sessionsDeleteService');

class SessionsController {
    async create(req, resp) {
        const { email, password } = req.body;
        const userRepository = new UserRepositories();
        const sessionsCreateService = new SessionsCreateService(userRepository);

        const { user, token, cookieOptions } =
            await sessionsCreateService.execute({
                email,
                password,
            });

        resp.cookie('token', token, cookieOptions);

        return resp.status(201).json({ user });
    }

    async delete(req, resp) {
        const { id, role } = req.user;
        const { email } = req.body;
        const sessionsDeleteService = new SessionsDeleteService(
            repositories.userRepository
        );
        const cookieOptions = await sessionsDeleteService.execute(
            id,
            role,
            email
        );

        resp.clearCookie('token', cookieOptions);

        return resp.status(200).json('Logout successfully');
    }

    async verify(req, resp) {
        return resp.status(200).json({ user: req.user });
    }
}

module.exports = SessionsController;
