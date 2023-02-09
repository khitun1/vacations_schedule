const Router = require('express');
const router = new Router();
const wishesController = require('../controllers/wishesController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/getList', authMiddleware, wishesController.getList);
router.post('/create', authMiddleware,  wishesController.create);
router.post('/del', authMiddleware,  wishesController.del);

module.exports = router;