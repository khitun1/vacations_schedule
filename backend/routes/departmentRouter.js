const Router = require('express');
const router = new Router();
const departmentController = require('../controllers/departmentController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/getList', checkRoleMiddleware(),  departmentController.getList);
router.post('/create', checkRoleMiddleware(),  departmentController.create);
router.post('/changeConditions', checkRoleMiddleware(),  departmentController.changeCon);
router.delete('/del', checkRoleMiddleware(),  departmentController.del);

module.exports = router;