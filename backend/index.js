require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const {User, Year, Department} = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandleMiddleware');

const port = process.env.PORT;

const app = express();
app.use(cors())
    .use(express.json())
    .use('/api', router)
    .use(errorHandler)

const update = async () => {
    const currentYear = new Date().getFullYear();
    const id = (await Year.findOne()).dataValues.id;
    const dbYear = (await Year.findOne()).dataValues.year;
    if (currentYear > dbYear) {
        await Year.update({year: currentYear}, {
            where: {id}
        })
    }
    const users = await User.findAll();
    for (let i = 0; i < users.length; i++) {
        const update_days = (await Department.findOne({
            where: {
                id: users[i].dataValues.departmentId,
            }
        })).dataValues.total;
        const total_days = users[i].dataValues.left_days + update_days;
        await User.update({left_days: total_days}, {
            where: {
                id: users[i].dataValues.id,
            }
        })
    }
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        update();
        app.listen(port, () => console.log('Server is running on port', port));
    } catch (e) {
        console.log(e);
    }
}

start();