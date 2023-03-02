const {User, Department, Vacations,History} = require('../models/models');
const bcrypt = require('bcrypt');
const apiError = require("../error/apiError");
const winston = require('../winston');
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const moment = require("moment");


class UsersController {

    async getVacations(req, res, next) {
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
            });

            let vacationsEmployees = [];
            for (let i = 0; i < users.length; i++) {
                const partVacs = await Vacations.findAll({
                    where: {
                        UserId: users[i].id,
                        status: {
                            [Op.ne]: 'Отказ',
                        }
                    }
                })
                vacationsEmployees.push(...partVacs);
            }
            vacationsEmployees.sort((a, b) => a.surname > b.surname ? -1 : 1);
            vacationsEmployees.sort((a, b) => a.number > b.number ? 1 : -1);
            return res.json({vacationsEmployees});
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
            const {first_name, last_name, surname, mail, login, password, is_admin} = req.body;
            const dep = await Department.findOne({
                where: {
                    name: req.user.department,
                }
            });
            const user = await User.findOne({
                where: {login}
            });
            if (user) {
                return next(apiError.badRequest('Пользователь с таким логином уже есть!'));
            }
            const departmentId = dep.id;
            const left_days = dep.total;
            const md5password = await bcrypt.hash(password, 5);
            await User.create({first_name, last_name, surname, left_days, mail,
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
            let users ;
            if(!req.user.director) {
                const dep = await Department.findOne({
                    where: {
                        name: req.user.department,
                    }
                });
                users =  await User.findAll({
                    where: {
                        departmentId: dep.id,
                    }
                });
            }
            else {
                users =  await User.findAll();
            }
            // users.forEach(p => {
            //     p.departmentId = dep.name
            // })
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

            const {id, status, explanation} = req.body;
            const userId = await Vacations.findOne({
                where: {
                    id: id,
                }
            });
            const statusMsg = status === 'Отказ' ? 'отклонена.' : 'принята.';
            const user = await User.findOne({
                where: {
                    id: userId.userId,
                }
            })
            await Vacations.update({
                status: status,
                explanation: explanation,
            }, {
                where: {
                    id: id,
                }
            })
            const vacations = await Vacations.findAll({
                where: {
                    userId: userId.userId,
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

            let transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'vschedule@mail.ru',
                    pass: '0xVq3Lj72R7N4W2kwANm',
                },
            })
            await transporter.sendMail({
                from: 'Сервис для планирования отпусков сотрудников <vschedule@mail.ru>',
                to: user.mail,
                subject: 'Решение по отпуску',
                text: 'Ваша заявка на отпуск с ' +
                    moment(userId.start).format('DD.MM.YYYY')
                    + ' по ' + moment(userId.end).format('DD.MM.YYYY')  + ' была ' + statusMsg,
            }, (err) => {
                console.log(err)
            });
            return res.send("Vacation have decided!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Decide vacation"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

    async clearNotes(req, res, next) {
        try {
            await History.destroy({
                where: {
                    adminId: req.user.id,
                }
            })
            return res.send("Notes have cleared!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Clear notes"
                + "   User: " + JSON.stringify(req.user));
        }
    }

}

module.exports = new UsersController();