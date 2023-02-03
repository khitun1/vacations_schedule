const {Type} = require('../models/models');
const apiError = require('../error/apiError');
const winston = require('../winston');
class typeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            await Type.create({name});
            return res.send('Type have created!');
        } catch (e)
        {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Create type"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }
    async getList(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.send(types);
        } catch (e)
        {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of types"
                + "   User: " + JSON.stringify(req.user));
        }

    }

    async change(req, res, next) {
        try {
            const {id, name} = req.body;
            await Type.update({name: name}, {
                where: {id}
            });
            return res.send("Name have changed!");
        } catch (e)
        {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Change type's name"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }

    async del(req,res, next) {
        try {
            const {id} = req.body;
            await Type.destroy({
                where: {id}
            })
            return res.send("Type have deleted!");
        } catch (e)
        {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Delete type"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }
    }
}

module.exports = new typeController();