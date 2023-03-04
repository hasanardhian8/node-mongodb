const router = require('express').Router();
const bookController = require("../controller/bookController")

router.get('/book', bookController.get)
router.post('/addbook', bookController.add)
router.put('/:id', bookController.update)

module.exports = router;