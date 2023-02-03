const {Department, User} = require('../models/models');
const apiError = require('../error/apiError');
const winston = require('../winston');

class departmentController {
    async create(req, res, next) {
        try {
            const {name, min, max, total, percents} = req.body;
            await Department.create({name, min, max, total, percents});
            return res.send("Department have created!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Create department"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }
    async getList(req, res, next) {
        try {
            const currentUser = await User.findOne({
                where: {
                    id: req.user.id,
                }
            });
            const deps = await Department.findOne({
                where: {
                    id: currentUser.dataValues.departmentId,
                }
            });
            return res.send(deps);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of departments"
                + "   User: " + JSON.stringify(req.user));
        }
    }

    async changeName(req, res, next) {
        try {
            const {id, name} = req.body;
            await Department.update({name: name}, {
                where: {id}
            });
            return res.send("Name have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change department's name"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

    async changeMin(req, res, next) {
        try {
            const {id, min} = req.body;
            await Department.update({min}, {
                where: {id}
            });
            return res.send("Min have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change department's min"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }
    async changeMax(req, res, next) {
        try {
            const {id, max} = req.body;
            await Department.update({max}, {
                where: {id}
            });
            return res.send("Max have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change department's max"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }
    async changeTotal(req, res, next) {
        try {
            const {id, total} = req.body;
            await Department.update({total}, {
                where: {id}
            });
            return res.send("Total have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change department's total"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }
    async changePercents(req, res, next) {
        try {
            const {id, percents} = req.body;
            await Department.update({percents}, {
                where: {id}
            });
            return res.send("Percents have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change department's percents"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }

    async del(req,res, next) {
        try {
            const {id} = req.body;
            await Department.destroy({
                where: {id}
            })
            return res.send("Department have deleted!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Delete department"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }
}

module.exports = new departmentController();