const {Vacations} = require("../models/models");
const apiError = require("../error/apiError");

class vacationController {
    async create(req, res, next) {
        try {
            const {number, start, end, requested_date, status, paid, explanation, userId, typeId} = req.body;
            await Vacations.create({number, start, end, requested_date, status, paid, explanation, userId, typeId});
            return res.send('Vac Ok!');
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }

    async getList(req,res, next) {
        try {
            const vacations = await Vacations.findAll();
            return res.send(vacations);
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }

    async change(req, res, next) {
        try {
            const {id, status} = req.body;
            await Vacations.update({status: status}, {
                where: {id}
            });
            return res.send("change is ok!");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }
}

module.exports = new vacationController();