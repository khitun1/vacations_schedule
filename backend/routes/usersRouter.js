const Router = require('express');
const router = new Router();
const usersController = require('../controllers/usersController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/getVacations', checkRoleMiddleware(),  usersController.getVacations);
router.get('/getList', checkRoleMiddleware(),  usersController.getList);
router.post('/create', checkRoleMiddleware(),  usersController.create);
router.delete('/del', checkRoleMiddleware(), usersController.del);

module.exports = router;