const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

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

module.exports = router;
