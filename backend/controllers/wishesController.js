const {Wishes} = require("../models/models");
const apiError = require("../error/apiError");
const winston = require('../winston');

class wishesController {
    async create(req, res, next) {
        try {
            const {start, end, userId} = req.body;
            await Wishes.create({start, end, userId});
            return res.send("Wishes have created!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Create wishes"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }

    async getList(req,res, next) {
        try {
            const wishes = await Wishes.findAll();
            return res.send(wishes);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of wishes"
                + "   User: " + JSON.stringify(req.user));
        }

    }

    async del(req, res, next) {
        try {
            const {id} = req.body;
            await Wishes.destroy({
                where: {id}
            })
            return res.send("Wishes have deleted!");
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Delete wishes"
                + "   User: " + JSON.stringify(req.user) + "  Body: "  + JSON.stringify(req.body));
        }

    }
}

module.exports = new wishesController();