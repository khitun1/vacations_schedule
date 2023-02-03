const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.post('/changeLogin', authMiddleware, userController.changeLogin);
router.post('/changePassword', authMiddleware, userController.changePassword);


module.exports = router;