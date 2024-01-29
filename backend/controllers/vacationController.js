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
            await vacs.forEach(p => {
                Vacations.create({number: p.number, start: p.start, end: p.end,
                    requested_date: p.requested_date, status: p.status, paid: p.paid,
                    explanation: p.explanation, userId: p.userId});
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
            const actual_date = moment();
            const actual_days = user.rules ? Math.floor(user.left_days) - total : Math.floor(user.left_days) + req.user.total - total;
            await User.update({actual_days, actual_date}, {
                where: {
                    id: req.user.id,
                }
            })
            // await User.update({allow: 0, accept_all: 0}, {
            //     where: {
            //         id: req.user.id,
            //     }
            // })
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
            const currentVacation = await Vacations.findOne({
                where: {
                    id: req.body.id,
                }
            })
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
            if (currentVacation.status === 'Ожидание') {
                const user = await User.findOne({
                    where: {
                        id: req.user.id,
                    }
                })
                await User.update({actual_days: user.actual_days + req.body.days}, {
                    where: {
                        id: req.user.id,
                    }
                });
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

    async getHolidays(req, res, next) {
        try {
            const year = moment().year();
            let holidays = [];
            for (let i = -1; i < 3; i++) {
                holidays.push(moment(year + i + '-02-23')._d);
                holidays.push(moment(year + i + '-03-08')._d);
                holidays.push(moment(year + i + '-05-01')._d);
                holidays.push(moment(year + i + '-05-09')._d);
            }
            res.json({holidays});
        } catch (e) {
            return next(apiError.internal(e.message));
        }
    }
}

module.exports = new vacationController();