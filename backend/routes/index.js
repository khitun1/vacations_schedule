const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const departmentRouter = require('./departmentRouter');
const vacationRouter = require('./vacationRouter');
const typeRouter = require('./typeRouter');
const wishesRouter = require('./wishesRouter');

router.use('/user', userRouter);
router.use('/department', departmentRouter);
router.use('/vacation', vacationRouter);
router.use('/type', typeRouter);
router.use('/wishes', wishesRouter);

module.exports = router;