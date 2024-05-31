const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/getDates', authMiddleware, userController.getDates);
router.post('/changeLogin', authMiddleware, userController.changeLogin);
router.post('/changeMail', authMiddleware, userController.changeMail);
router.post('/changePassword', authMiddleware, userController.changePassword);
router.get('/getYear', authMiddleware, userController.getYear);
router.get('/nextYear', authMiddleware, userController.nextYear);


module.exports = router;