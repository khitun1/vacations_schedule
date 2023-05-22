const Router = require('express');
const router = new Router();
const departmentController = require('../controllers/departmentController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/getList', authMiddleware,  departmentController.getList);
router.post('/create', checkRoleMiddleware(),  departmentController.create);
router.post('/changeConditions', checkRoleMiddleware(),  departmentController.changeCon);
router.delete('/del', checkRoleMiddleware(),  departmentController.del);
router.post('/changeRules', checkRoleMiddleware(),  departmentController.changeRules);

module.exports = router;