const {Department} = require('../models/models');
class departmentController {
    async create(req, res) {
        const {name, min, max, total, percents} = req.body;
        await Department.create({name, min, max, total, percents});
        return res.send('Dep Ok!');
    }
    async getList(req, res) {
        const deps = await Department.findAll();
        return res.send(deps);
    }

    async change(req, res) {

    }

    async del(req,res) {

    }
}

module.exports = new departmentController();