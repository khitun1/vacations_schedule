const {Type} = require('../models/models');
const apiError = require('../error/apiError');
class typeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            await Type.create({name});
            return res.send('Ok!');
        } catch (e)
        {
            return next(apiError.badRequest(e.message));
        }

    }
    async getList(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.send(types);
        } catch (e)
        {
            return next(apiError.badRequest(e.message));
        }

    }

    async change(req, res, next) {
        try {
            const {id, name} = req.body;
            await Type.update({name: name}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e)
        {
            return next(apiError.badRequest(e.message));
        }

    }

    async del(req,res, next) {
        try {
            const {id} = req.body;
            await Type.destroy({
                where: {id}
            })
            return res.send("Del type");
        } catch (e)
        {
            return next(apiError.badRequest(e.message));
        }

    }
}

module.exports = new typeController();