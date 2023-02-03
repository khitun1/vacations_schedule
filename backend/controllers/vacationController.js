const {Vacations} = require("../models/models");
const apiError = require("../error/apiError");
const winston = require('../winston');

class vacationController {
    async create(req, res, next) {
        try {
            const {number, start, end, requested_date, status, paid, explanation, userId, typeId} = req.body;
            await Vacations.create({number, start, end, requested_date, status, paid, explanation, userId, typeId});
            return res.send('Vacation have created!');
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
            const vacations = await Vacations.findAll();
            return res.send(vacations);
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        } finally {
            winston.info("Time: " + new Date() + " Action: Get list of vacations"
                + "   User: " + JSON.stringify(req.user));
        }
    }
}

module.exports = new vacationController();