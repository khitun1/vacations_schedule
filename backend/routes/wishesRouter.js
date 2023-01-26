const Router = require('express');
const router = new Router();
const wishesController = require('../controllers/wishesController');

router.get('/getList', wishesController.getList);
router.post('/create', wishesController.create);
router.delete('/del', wishesController.del);

module.exports = router;