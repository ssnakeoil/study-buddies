const router = require("express").Router();
const { User } = require("../../models");


// CREATE new user
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const usrInfo = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.logged_in = true
      req.session.user_id = usrInfo.insertId //inserted Id
      req.session.first_name = req.body.first_name
      req.session.last_name = req.body.last_name
      return res.status(200).json(usrInfo);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "No user found with that email!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      console.log(userData.id);
      req.session.logged_in = true;

      res.json({ user: userData, message: "Logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post("/logout", (req, res) => {
  console.log('POST /logout');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/')
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;