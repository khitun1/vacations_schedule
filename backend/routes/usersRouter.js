const Router = require('express');
const router = new Router();
const usersController = require('../controllers/usersController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/getVacations', checkRoleMiddleware(),  usersController.getVacations);
router.get('/getList', checkRoleMiddleware(),  usersController.getList);
router.get('/clearNotes', checkRoleMiddleware(),  usersController.clearNotes);
router.post('/create', checkRoleMiddleware(),  usersController.create);
router.post('/decision', checkRoleMiddleware(),  usersController.decisionVacation);
router.post('/del', checkRoleMiddleware(), usersController.del);
router.post('/addDays', checkRoleMiddleware(), usersController.addDays);
router.post('/excludeRules', checkRoleMiddleware(), usersController.excludeRules);

module.exports = router;