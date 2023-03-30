const router = require('express').Router();
const bookController = require("../controller/bookController")
const {isAuthenticated,isAdmin} = require("../middleware/auth")

router.get('/book', bookController.get)
router.post('/addbook', isAuthenticated, isAdmin, bookController.add)
router.put('/:id', bookController.update)

module.exports = router;