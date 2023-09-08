const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    const data = dbPostData.map((post) => {
      return post.get({ plain: true });
    });

    res.render("dashboard", { data, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newpost', (req, res) => {
    res.render('dbnewpost', { loggedIn: req.session.loggedIn });
})

router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const postData = dbPostData.get({ plain: true })

    res.render('edit-post', { postData, loggedIn: req.session.loggedIn })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
