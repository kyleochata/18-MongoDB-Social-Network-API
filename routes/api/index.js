const router = require('express').Router();
const usersRoutes = require('./usersRoute');
const thoughtsRoutes = require('./thoughtsRoute');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router