const router = require('express').Router();
const userRoutes = require("./User-routes");


router.use('/user', userRoutes);


module.exports = router;
