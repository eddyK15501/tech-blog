const { Comment } = require("../models");

const newComment = {
  comment_text: "You'll Do N00TiN, u liTl weeZeL.",
  user_id: "3",
  post_id: "3",
};

const seedComments = () => Comment.create(newComment);

module.exports = seedComments;
