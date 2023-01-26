const {Vacations} = require("../models/models");

class vacationController {
    async create(req, res) {
        const {number, start, end, requested_date, status, paid, explanation, userId, typeId} = req.body;
        await Vacations.create({number, start, end, requested_date, status, paid, explanation, userId, typeId});
        return res.send('Vac Ok!');
    }

    async getList(req,res) {
        const vacations = await Vacations.findAll();
        return res.send(vacations);
    }
}

module.exports = new vacationController();