const router = require('express').Router();
const returnController = require("../controller/returnController")

router.post('/add', returnController.add)

module.exports = router;