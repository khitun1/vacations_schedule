const Router = require('express');
const router = new Router();
const vacationController = require('../controllers/vacationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getList', authMiddleware,vacationController.getList);
router.post('/create', authMiddleware, vacationController.create);
router.post('/del', authMiddleware, vacationController.del);
router.get('/getHolidays', authMiddleware, vacationController.getHolidays);

module.exports = router;