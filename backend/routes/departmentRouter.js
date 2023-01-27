const Router = require('express');
const router = new Router();
const departmentController = require('../controllers/departmentController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/getList', checkRoleMiddleware(),  departmentController.getList);
router.post('/create', checkRoleMiddleware(),  departmentController.create);
router.put('/changeName', checkRoleMiddleware(),  departmentController.changeName);
router.put('/changeMin', checkRoleMiddleware(),  departmentController.changeMin);
router.put('/changeMax', checkRoleMiddleware(),  departmentController.changeMax);
router.put('/changeTotal', checkRoleMiddleware(),  departmentController.changeTotal);
router.put('/changePercents', checkRoleMiddleware(),  departmentController.changePercents);
router.delete('/del', checkRoleMiddleware(),  departmentController.del);

module.exports = router;