const {Type} = require('../models/models');
const apiError = require('../error/apiError');
class typeController {
    async create(req, res) {
        const {name} = req.body;
        await Type.create({name});
        return res.send('Ok!');
    }
    async getList(req, res) {
        const types = await Type.findAll();
        return res.send(types);
    }

    async change(req, res) {

    }

    async del(req,res) {

    }
}

module.exports = new typeController();