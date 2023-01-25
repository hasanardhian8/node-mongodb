const router = require('express').Router();
const loanController = require("../controller/loanController")

router.post('/addloan', loanController.addloan)
router.post('/updatereturn', returnController.updatereturn)

module.exports = router;