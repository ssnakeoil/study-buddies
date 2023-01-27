const router = require("express").Router();
const { User, Post } = require("../models")
const withAuth = require("../utils/auth");


router.get("/login", async (req, res) => {
    console.log(`GET /login`);
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
});

module.exports = router;