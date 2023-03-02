require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const {User, Year, Department, History, Vacations} = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandleMiddleware');


const port = process.env.PORT;

const app = express();
const WS = require('express-ws')(app);
const aWss = WS.getWss();

app.ws('/', function(ws, req) {
    ws.on('message', async (msg) => {
        const message = JSON.parse(msg);
        switch (message.method) {
            case 'connection':
                const dep = await Department.findOne({
                    where: {
                        name: message.department,
                    }
                })
                const admin = await User.findOne({
                    where: {
                        departmentId: dep.id,
                        is_admin: 1,
                    }
                })
                ws.id = message.id;
                ws.adminId = admin.id;
                break;
            case 'message':
                aWss.clients.forEach(async (p) => {
                    if(p.id === ws.adminId) {
                        const notes = await History.findAll({
                            where: {
                                adminId: p.id,
                            }
                        })
                        const user = await User.findOne({
                            where: {
                                id: ws.id
                            }
                        })
                        const vacs = await Vacations.findAll({
                            where: {
                                userId: ws.id,
                            }
                        })
                        vacs.sort((a, b) => a.id > b.id ? -1 : 1);
                        notes.sort((a, b) => a.id > b.id ? -1 : 1);
                        const name = user.surname + ' ' + user.first_name[0] + '.' + user.last_name[0] +'.';
                        const note = {
                            name: name,
                            notes: notes,
                            vac: vacs[0],
                        }
                        p.send(JSON.stringify(note))
                    }
                }) 
                break;
        }
    })
});

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