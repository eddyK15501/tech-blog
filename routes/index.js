const router = require('express').Router();

const homeRoutes = require('../controllers/home-routes')

router.use('/', homeRoutes);

module.exports = router;