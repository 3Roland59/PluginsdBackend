const express = require('express')
const { signUp, fetchUser, deleteAccount, login, verifyEmail, resendEmailToken } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/register').post(signUp)
router.route('/login').post(login)
router.route('/verify').post(verifyEmail)
router.route('/resend-email-token').post(resendEmailToken)
router.route('/user').get(verifyToken, fetchUser).delete(verifyToken, deleteAccount)

module.exports = router