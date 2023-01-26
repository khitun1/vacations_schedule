const Router = require('express');
const router = new Router();
const departmentController = require('../controllers/departmentController');

router.get('/getList', departmentController.getList);
router.post('/create', departmentController.create);
router.put('/changeName', departmentController.changeName);
router.put('/changeMin', departmentController.changeMin);
router.put('/changeMax', departmentController.changeMax);
router.put('/changeTotal', departmentController.changeTotal);
router.put('/changePercents', departmentController.changePercents);
router.delete('/del', departmentController.del);

module.exports = router;