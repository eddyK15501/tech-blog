const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET COMMENTS
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      include: [{ model: Post, attributes: ["title", "content"] }],
    });
    if (!dbCommentData) {
      res.status(404).json({ message: "No comments were found." });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET SINGLE COMMENT
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ["title", "content"],
        },
      ],
    });
    if (!dbCommentData) {
      res.status(404).json({ message: "No comment was found." });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST ~ CREATE NEW COMMENT
router.post("/", withAuth, async (req, res) => {
  try {
    const { comment_text, post_id } = req.body;
    const dbCommentData = await Comment.create({
      comment_text,
      post_id,
      user_id: req.session.user_id,
    });
    res.status(201).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT ~ UPDATE COMMENT
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    if (dbCommentData[0] === 0) {
      res.status(404).json({ message: "No comment was found to update." });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE ~ DELETE COMMENT
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!dbCommentData) {
      res.status(404).json({ message: "No comment was found to delete." });
      return;
    }
    res.status(204).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
