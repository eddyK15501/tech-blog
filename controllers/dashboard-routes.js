const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const dbPostData = await Post.findAll({
    where: { user_id: req.session.user_id },
  });

  const data = dbPostData.map((post) => {
    return post.get({ plain: true });
  });
  console.log(data);

  res.render("dashboard", { data, loggedIn: req.session.loggedIn });
});

module.exports = router;
