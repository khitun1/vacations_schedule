const {Vacations, Department, User, History} = require("../models/models");
const apiError = require("../error/apiError");
const winston = require('../winston');
const { Op } = require("sequelize");

class vacationController {
    async create(req, res, next) {
        try {
            const {number, start, end, requested_date, status, paid, explanation, userId, typeId} = req.body;
            const vac = await Vacations.create({number, start, end, requested_date
                , status, paid, explanation, userId, typeId});
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
            return res.send({id: vac.id});
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