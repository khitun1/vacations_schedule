const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const departmentRouter = require('./departmentRouter');
const vacationRouter = require('./vacationRouter');
const wishesRouter = require('./wishesRouter');
const usersRouter = require('./usersRouter');

router.use('/user', userRouter);
router.use('/department', departmentRouter);
router.use('/vacation', vacationRouter);
router.use('/wishes', wishesRouter);
router.use('/users', usersRouter);


module.exports = router;