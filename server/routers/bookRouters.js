const router = require('express').Router();
const bookController = require("../controller/bookController")

router.post('/addbook', bookController.add)
router.put('/updatebook',bookController.updateBook)

module.exports = router;