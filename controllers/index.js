const router = require('express').Router();

const homeRoutes = require('./home-routes');
const dashBoardRoutes = require('./dashboard-routes')
const apiRoutes = require('./api')

router.use('/', homeRoutes);
// router.use('/dashboard', dashBoardRoutes);
router.use('/api', apiRoutes);

module.exports = router;