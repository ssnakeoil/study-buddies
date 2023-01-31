const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;


// this file does not need to be modified