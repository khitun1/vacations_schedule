const {Department} = require('../models/models');
const apiError = require('../error/apiError');
class departmentController {
    async create(req, res, next) {
        try {
            const {name, min, max, total, percents} = req.body;
            await Department.create({name, min, max, total, percents, id_manager: req.user.id});
            return res.send('Dep Ok!');
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }
    }
    async getList(req, res) {
        try {
            const deps = await Department.findAll({
                where: {
                    id_manager: req.user.id,
                }
            });
            return res.send(deps);
        } catch (e) {
            return res.send(apiError.badRequest(e.message).message);
        }
    }

    async changeName(req, res, next) {
        try {
            const {id, name} = req.body;
            await Department.update({name: name}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }

    async changeMin(req, res, next) {
        try {
            const {id, min} = req.body;
            await Department.update({min}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }
    }
    async changeMax(req, res, next) {
        try {
            const {id, max} = req.body;
            await Department.update({max}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }
    async changeTotal(req, res, next) {
        try {
            const {id, total} = req.body;
            await Department.update({total}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }
    async changePercents(req, res, next) {
        try {
            const {id, percents} = req.body;
            await Department.update({percents}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }
    }

    async del(req,res, next) {
        try {
            const {id} = req.body;
            await Department.destroy({
                where: {id}
            })
            return res.send("Del dep");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }
    }
}

module.exports = new departmentController();