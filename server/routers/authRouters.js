const router = require('express').Router();
const authController = require("../controller/authController")

router.post('/signup', authController.signUp_post)
router.post('/signin', authController.signIn_post)
router.get('/signup', authController.signUp_get)
router.get('/signin', authController.signIn_get)
router.get('/logout', authController.logout)

module.exports = router;