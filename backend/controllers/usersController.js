const {User, Department, Vacations} = require('../models/models');
const bcrypt = require('bcrypt');

class UsersController {
    async getList(req, res, next) {
        const departments = await Department.findAll({
            where: {
                id_manager: req.user.id,
            }
        })
        let users = [];
        for (let i = 0; i < departments.length; i++) {
            const partUsers = await User.findAll({
                where: {
                    departmentId: departments[i].id
                }
            })
            users.push(...partUsers);
        }
        let vacations = [];
        for (let i = 0; i < users.length; i++) {
            const partVacs = await Vacations.findAll({
                where: {
                    UserId: users[i].id
                }
            })
            vacations.push(...partVacs);
        }
        for (let i = 0; i < vacations.length; i++) {
            const user = await User.findOne({
                where: {
                    id: vacations[i].userId,
                }
            })
            vacations[i].userId = user.first_name + ' ' + user.last_name + ' ' + user.surname;
        }
        res.send(vacations);
    }

    async create(req, res, next) {
        try {
            const {first_name, last_name, surname, left_days, login, password, is_admin, department} = req.body;
            const departmentId = Department.findOne({
                where: {
                    name: department
                }
            }).id;
            const md5password = await bcrypt.hash(password, 5);
            await User.create({first_name, last_name, surname, left_days,
                login, md5password, is_admin, departmentId});
            res.send("Created!");
        } catch (e) {
            res.send("No");
        }
    }

    async del(req, res, next) {
        const {id} = req.body;
        await User.destroy({
            where: {id}
        })
    }
}

module.exports = new UsersController();