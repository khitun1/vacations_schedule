const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.get('/getList', typeController.getList);
router.post('/change', typeController.change);
router.post('/create', typeController.create);
router.delete('/del', typeController.del);

module.exports = router;