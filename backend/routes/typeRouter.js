const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/getList', checkRoleMiddleware(),  typeController.getList);
router.put('/change', checkRoleMiddleware(),  typeController.change);
router.post('/create', checkRoleMiddleware(),  typeController.create);
router.delete('/del', checkRoleMiddleware(),  typeController.del);

module.exports = router;