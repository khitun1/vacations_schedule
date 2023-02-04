const apiError = require('../error/apiError');
const {User, Department} = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const winston = require('../winston');

const generateJwt = (id, is_admin, departmentId, surname, first_name, last_name, login, percent) => {
    return jwt.sign(
        {
            id: id,
            surname: surname,
            first_name: first_name,
            last_name: last_name,
            login: login,
            is_admin: is_admin,
            departmentId: departmentId,
            percent: percent,
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
                return next(apiError.badRequest('Неверный логин'));
            }
            let comparePassword =  bcrypt.compareSync(password, user.md5password);
            if (!comparePassword) {
                return next(apiError.badRequest('Неверный пароль'));
            }
            const department = await Department.findOne({
                where: {
                    id: user.departmentId
                }
            });
            const token = generateJwt(user.id, user.is_admin, user.departmentId,
                user.surname, user.first_name, user.last_name, user.login, department.percents / 100);
            const currentUser = {
                id: user.id,
                is_admin: user.is_admin,
                surname: user.surname,
                first_name : user.first_name,
                last_name : user.last_name,
                login : user.login,
                password: password,
                department: department.name,
                percent: department.percents / 100,
            }
            return res.json({token, currentUser});
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Login"
                + "  Body: "  + JSON.stringify(req.body));
        }

    }

    async check(req, res, next) {
        try {
            // const user = req.user;
            // const token = generateJwt(user.id, user.is_admin, user.departmentId,
            //     user.surname, user.first_name, user.last_name, user.login);
            // return res.json(token);
            return res.send(req.user);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Auth"
                + "   User: " + JSON.stringify(req.user));
        }
    }

    async changeLogin(req, res, next) {
        try {
            await User.update({login: req.body.login}, {
                where: {
                    id: req.user.id
                }
            })
            return res.send("Login have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change login"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }

    async changePassword(req, res, next) {
        try {
            const password = await bcrypt.hash(req.body.password, 5);
            await User.update({md5password: password}, {
                where: {
                    id: req.user.id
                }
            })
            res.send("Password have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change password"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }
}

module.exports = new UserController();