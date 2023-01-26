const {Wishes} = require("../models/models");

class wishesController {
    async create(req, res) {
        const {start, end, userId} = req.body;
        await Wishes.create({start, end, userId});
        return res.send('Wish Ok!');
    }

    async getList(req,res) {
        const wishes = await Wishes.findAll();
        return res.send(wishes);
    }

    async del(req, res) {

    }
}

module.exports = new wishesController();