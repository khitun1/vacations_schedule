const Router = require('express');
const router = new Router();
const vacationController = require('../controllers/vacationController');

router.get('/getList', vacationController.getList);
router.post('/create', vacationController.create);
router.put('/change', vacationController.change);

module.exports = router;