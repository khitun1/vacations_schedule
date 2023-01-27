const {Wishes} = require("../models/models");
const apiError = require("../error/apiError");

class wishesController {
    async create(req, res, next) {
        try {
            const {start, end, userId} = req.body;
            await Wishes.create({start, end, userId});
            return res.send('Wish Ok!');
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }

    async getList(req,res, next) {
        try {
            const wishes = await Wishes.findAll();
            return res.send(wishes);
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }

    async del(req, res, next) {
        try {
            const {id} = req.body;
            await Wishes.destroy({
                where: {id}
            })
            return res.send("Del wishes");
        } catch (e) {
            return next(apiError.badRequest(e.message));
        }

    }
}

module.exports = new wishesController();