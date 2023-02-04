const {User, Department, Vacations} = require('../models/models');
const bcrypt = require('bcrypt');
const apiError = require("../error/apiError");
const winston = require('../winston');

class UsersController {
    async getVacations(req, res, next) {
        try {
            const users = await User.findAll({
                where: {
                    departmentId: req.user.departmentId,
                }
            });
            let vacations = [];
            for (let i = 0; i < users.length; i++) {
                const partVacs = await Vacations.findAll({
                    where: {
                        UserId: users[i].id
                    }
                })
                vacations.push(...partVacs);
            }
            for (let i = 0; i < vacations.length; i++) {
                const user = await User.findOne({
                    where: {
                        id: vacations[i].userId,
                    }
                })
                vacations[i].userId = user.first_name + ' ' + user.last_name + ' ' + user.surname;
            }
            return res.send(vacations);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get employee's vacations"
                + "   User: " + JSON.stringify(req.user));
        }
    }

    async create(req, res, next) {
        try {
            const {first_name, last_name, surname, login, password, is_admin} = req.body;
            const dep = await Department.findOne({
                where: {
                    id: req.user.departmentId,
                }
            });
            const user = await User.findOne({
                where: {login}
            });
            if (user) {
                return next(apiError.badRequest('Пользователь с таким логином уже есть!'));
            }
            const departmentId = dep.dataValues.id;
            const left_days = dep.dataValues.total;
            const md5password = await bcrypt.hash(password, 5);
            await User.create({first_name, last_name, surname, left_days,
                login, md5password, is_admin, departmentId});
            res.send("User have created!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Create user"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }
    async getList(req, res, next) {
        try {
            const users =  await User.findAll({
                where: {
                    departmentId: req.user.departmentId,
                }
            });
            return res.send(users);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of users"
                + "   User: " + JSON.stringify(req.user));
        }
    }

    async del(req, res, next) {
        try {
            const {id} = req.body;
            await Vacations.destroy({
                where: {UserId: id}
            })
            await User.destroy({
                where: {id}
            })
            return res.send("User have deleted!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Delete user"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

    async decisionVacation(req, res, next) {
        try {
            const status = req.body.status;
            await Vacations.update({status: status}, {
                where: {
                    id: req.body.id,
                }
            })
            return res.send("Vacation have decided!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Decide vacation"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

}

module.exports = new UsersController();