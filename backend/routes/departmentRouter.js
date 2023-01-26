const Router = require('express');
const router = new Router();
const departmentController = require('../controllers/departmentController');

router.get('/getList', departmentController.getList);
router.post('/create', departmentController.create);
router.post('/change', departmentController.change);
router.delete('/del', departmentController.del);

module.exports = router;