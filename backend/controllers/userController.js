const apiError = require('../error/apiError');
class UserController {
    async login(req, res, next) {
        try {

        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }

    async check(req, res, next) {
        try {

        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }
}

module.exports = new UserController();