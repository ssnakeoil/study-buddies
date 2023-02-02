const router = require("express").Router();
const { User, Post, Comment, Flashcard } = require("../models")
const { withAuth, noSession } = require("../utils/auth");

//home route
router.get('/', withAuth, (req, res) => {
  res.render('home');
})

//signup route
router.get("/signup", noSession, async (req, res) => {
  console.log(`GET /login`);
  res.render("signup");
});


// login route
router.get("/login", noSession, async (req, res) => {
  console.log(`GET /login`);
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// logout route
router.get("/logout", withAuth, async (req, res) => {
  console.log(`GET /logout`);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
      return;
    });
  } else {
    res.status(404).end();
  }
});

router.get("/post", withAuth, async (req, res) => {
  console.log(`GET /post`);
  res.render("addpost", {
    logged_in: true,
  });
});

router.get("/posts", withAuth, async (req, res) => {
  console.log(`GET /posts`);
  try {
    const postData = await Post.findAll({
      order: [["date_created", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: ["comment", "post_id", "id", "date_created", "user_id"],
        },
        {
          model: User,
          attributes: ["first_name", "last_name", "id"],
        },
      ],
    });
    console.log(postData);

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("posts", {
      posts,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attribute: ["first_name", "last_name"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("posts", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;