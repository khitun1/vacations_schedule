require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandleMiddleware');
const {Department, User,
    History, Vacations} = require("./models/models");


const port = process.env.PORT;

console.log(port)

const app = express();

const WS = require('express-ws')(app);
const aWss = WS.getWss();

app.ws('/', (ws, req) => {
    ws.on('message', async (msg) => {
        const parsedMsg = JSON.parse(msg);
        switch (parsedMsg.method) {
            case 'connection':
                const department = await Department.findOne({
                    where: {
                        name: parsedMsg.userDepartment
                    }
                })
                const admin = await User.findOne({
                    where: {
                        departmentId: department.id,
                        is_admin: 1,
                    }
                })
                ws.id = parsedMsg.userId;
                ws.adminId = admin.id;
                break;
            case 'message':
                aWss.clients.forEach(async (socket) => {
                    if (socket.id === ws.adminId) {
                        let notes = await History.findAll({
                            where: {
                                adminId: socket.id,
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
                            vacs: parsedMsg.vacs,
                        }
                        socket.send(JSON.stringify(note));
                    }
                })
                break;
        }
    });
});


app.use(cors())
    .use(express.json())
    .use('/api', router)
    .use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log('Server is running on port', port));
    } catch (e) {
        console.log(e);
    }
}

start();