const router = require('express').Router();
const bookController = require("../controller/bookController")

router.post('/add', bookController.add)

module.exports = router;