const { Router } = require('express');
const SessionsController = require('../controller/sessions.Controller');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.get('/', ensureAuthenticated, sessionsController.delete);

module.exports = sessionsRouter;
