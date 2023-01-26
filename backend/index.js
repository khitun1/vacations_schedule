require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandle = require('./middleware/errorHandleMiddleware');

const port = process.env.PORT;

const app = express();
app.use(cors())
    .use(express.json())
    .use('/api', router)
    .use(errorHandle)



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