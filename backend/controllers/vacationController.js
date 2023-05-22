const {Vacations, Department, User, History} = require("../models/models");
const apiError = require("../error/apiError");
const winston = require('../winston');
const { Op } = require("sequelize");
const moment = require("moment");

class vacationController {
    async create(req, res, next) {
        try {
            const {vacs, total} = req.body;
            const user = await User.findOne({
                where: {id: req.user.id}
            })
            vacs.forEach(async(p) => {
                await Vacations.create({number: p.number, start: p.start, end: p.end,
                    requested_date: p.requested_date, status: p.status, paid: p.paid,
                    explanation: p.explanation, userId: p.userId});
                await User.update({actual_days: user.left_days - total}, {
                    where: {
                        id: user.id,
                    }
                });
            })
            const vacations = await Vacations.findAll({
                where: {
                    userId: req.user.id,
                    status: {
                        [Op.ne] : 'Отказ',
                    }
                }
            })
            let num = 1;
            for (let i = 0; i < vacations.length; i++) {
                Vacations.update({number: num++}, {
                    where: {
                        id: vacations[i].id,
                    }
                })
            }
            const dep = await Department.findOne({
                where: {
                    name: req.user.department
                }});
            const admin = await User.findOne({
                where: {
                    departmentId: dep.id,
                    is_admin: true,
                }
            })
            await History.create({
                user: req.user.surname + ' ' + req.user.first_name[0] + '.' + req.user.last_name[0] + '.',
                adminId: admin.id,
            })
            const actual_days = user.allow && user.accept_all ? user.left_days - total : user.actual_days - total;
            await User.update({actual_days}, {
                where: {
                    id: req.user.id,
                }
            })
            await User.update({allow: 0, accept_all: 0}, {
                where: {
                    id: req.user.id,
                }
            })
            return res.send("All is ok!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Create vacation"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }

    async getList(req,res, next) {
        try {
            const vacations = await Vacations.findAll({
                where: {
                    userId: req.user.id,
                }
            });
            return res.send(vacations);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of vacations"
                + "   User: " + JSON.stringify(req.user));
        }
    }

    async del(req,res,next) {
        try {
            await Vacations.destroy({
                where: {
                    id: req.body.id,
                }
            })
            const vacations = await Vacations.findAll({
                where: {
                    userId: req.user.id,
                    status: {
                        [Op.ne] : 'Отказ',
                    }
                }
            })
            let num = 1;
            for (let i = 0; i < vacations.length; i++) {
                Vacations.update({number: num++}, {
                    where: {
                        id: vacations[i].id,
                    }
                })
            }
            res.send("Vacation have deleted");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Delete vacation"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }
}

module.exports = new vacationController();