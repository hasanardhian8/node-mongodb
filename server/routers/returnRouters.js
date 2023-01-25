const router = require('express').Router();
const returnController = require("../controller/returnController")

router.post('/addreturn', returnController.addreturn)
router.post('/updatereturn', returnController.updatereturn)

module.exports = router;