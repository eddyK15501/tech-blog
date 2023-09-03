const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogPosts = dbPostData.map((blog) => {
        return blog.get({ plain: true });
    });
    console.log(blogPosts);

    res.render('homepage', {
      blogPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

module.exports = router;
