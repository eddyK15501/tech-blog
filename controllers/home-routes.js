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
    // console.log(blogPosts);
    // console.log(req.session)

    res.render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbPostData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Comment,
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    }
                ]
            });
            const postComments = dbPostData.get({ plain: true });
            res.render('comments', { postComments, loggedIn: req.session.loggedIn })
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
})

module.exports = router;
