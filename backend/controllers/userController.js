const apiError = require('../error/apiError');
const {User, Department, Vacations, History} = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const winston = require('../winston');
const { Op } = require("sequelize");

const generateJwt = (id, is_admin, department, surname, first_name, last_name, login, percent,
                      mail, director, allow, left, actual_days, rules, acceptAll, total) => {
    return jwt.sign(
        {
            id,
            surname,
            first_name,
            last_name,
            login,
            is_admin,
            department,
            percent,
            mail,
            director,
            allow,
            left,
            actual_days,
            rules,
            acceptAll,
            total,
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
                where: {
                    [Op.or]: [
                        {login: login},
                        {mail: login}
                    ]
                }
            })
            if (!user) {
                return res.send('Неверный логин или почта');
            }
            let comparePassword =  bcrypt.compareSync(password, user.md5password);
            if (!comparePassword) {
                return res.send('Неверный пароль');
            }
            const department = await Department.findOne({
                where: {
                    id: user.departmentId
                }
            })
            const token = generateJwt(user.id, user.is_admin, department.name,
                user.surname, user.first_name, user.last_name, user.login,
                department.percents / 100, user.mail, user.director, user.allow,
                Math.floor(user.left_days), user.actual_days, user.rules, user.accept_all, department.total);
            const history = await History.findAll({
                where: {
                    adminId: user.id,
                }
            })
            let allDepartments;
            if (user.director) {
                allDepartments = await Department.findAll();
            }
            history.sort((a, b) => a.id > b.id ? -1 : 1);
            return res.json({token: token, history: history, allDepartments: allDepartments});
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
            const user = await User.findOne({
                where: {
                    id: req.user.id,
                }
            })
            let history = await History.findAll({
                where: {
                    adminId: user.id,
                }
            })
            let allDepartments;
            if (user.director) {
                allDepartments = await Department.findAll();
            }

            const department = await Department.findOne({
                where: {
                    id: user.departmentId
                }
            })
            history.sort((a, b) => a.id > b.id ? -1 : 1);
            const token = generateJwt(user.id, user.is_admin, department.name,
                user.surname, user.first_name, user.last_name, user.login,
                req.user.percent, user.mail, user.director, user.allow,
                Math.floor(user.left_days), user.actual_days, user.rules, user.accept_all, department.total);
             return res.json({token: token, history: history, allDepartments: allDepartments});
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
            return res.send('Login has changed');
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change login"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

    async changeMail(req, res, next) {
        try {
            await User.update({mail: req.body.mail}, {
                where: {
                    id: req.user.id
                }
            })
            return res.send('Mail has changed');
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
            return res.send('Password has changed');
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change password"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

    async getDates(req, res, next) {
        try {
            const dep = await Department.findOne({
                where: {
                    name: req.user.department,
                }
            })
            const users = await User.findAll({
                where: {
                    departmentId: dep.id,
                }
            })

            let dates = [];
            for (let i = 0; i < users.length; i++) {
                const partVacs = await Vacations.findAll({
                    where: {
                        UserId: users[i].id,
                        status: {
                            [Op.ne] : 'Отказ',
                        }
                    }
                })
                dates.push(...partVacs);
            }
            return res.json({dates, len: users.length});
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get dates of vacations"
                + "   User: " + JSON.stringify(req.user));
        }
    }
}

module.exports = new UserController();