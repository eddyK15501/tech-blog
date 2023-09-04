const { Comment } = require("../models");

const newComment = {
  comment_text: "You'll Do N00TiN, YaH LiTL weeZeL.",
  user_id: "5",
  post_id: "2",
};

const seedComments = () => Comment.create(newComment);

module.exports = seedComments;
