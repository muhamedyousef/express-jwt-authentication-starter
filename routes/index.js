const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/images',require('./images'));

module.exports = router;