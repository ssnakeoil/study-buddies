const router = require("express").Router();
const { User } = require("../../models");
const { noSession, withAuth } = require("../../utils/auth");


// CREATE new user
router.post("/", noSession, async (req, res) => {
  try {
    const usrInfo = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    let isAdmin = false;
    if (req.body.email == 'admin@gmail.com') {
      isAdmin = true;
    }
    req.session.save(() => {
      req.session.logged_in = true
      req.session.user_id = usrInfo.insertId //inserted Id
      req.session.first_name = req.body.first_name
      req.session.last_name = req.body.last_name
      req.session.isAdmin = isAdmin
      return res.status(200).json(usrInfo);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


router.post("/login", noSession, async (req, res) => {
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
    let isAdmin = false;
    if (req.body.email == 'admin@gmail.com') {
      isAdmin = true;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.first_name = userData.first_name
      req.session.logged_in = true;
      req.session.isAdmin = isAdmin;
      res.json({ user: userData, message: "Logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post("/logout", withAuth, (req, res) => {
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