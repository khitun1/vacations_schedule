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
            const dep = await Department.findOne({
                where: {
                    id: currentUser.dataValues.departmentId,
                }
            });
            return res.send(dep);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of departments"
                + "   User: " + JSON.stringify(req.user));
        }
    }

    async changeCon(req, res, next) {
        try{
            const {id, min, max, total, percents} = req.body;
            await Department.update({min, max, total, percents}, {
                where: {id}
            });
            return res.send("Conditions have changed!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change department"
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