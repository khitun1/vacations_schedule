const apiError = require('../error/apiError');
const {User} = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = (id, is_admin) => {
    return jwt.sign(
        {
            id: id,
            is_admin: is_admin,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
}

class UserController {
    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const user = await User.findOne({
                where: {login}
            });
            if (!user) {
                return next(apiError.internal('Неверный логин'));
            }
            let comparePassword = password === user.md5password;
            if (!comparePassword) {
                return next(apiError.internal('Неверный пароль'));
            }
            const token = generateJwt(user.id, user.is_admin);
            return res.json({token});
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.is_admin);
            return res.json({token});
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }
}

module.exports = new UserController();