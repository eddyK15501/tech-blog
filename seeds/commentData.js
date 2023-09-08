const { Comment } = require("../models");

const newComment = {
  comment_text: "Wh0daF00k is diS Guy? You'll Do N00TiN, yaH LiTL weeZeL.",
  user_id: 5,
  post_id: 3,
};

const seedComments = () => Comment.create(newComment);

module.exports = seedComments;
