const { Post } = require('../models');

const newPosts = [
  {
    title: 'Handlebars.js',
    content: 'Templating engines are quite outdated now days.',
    user_id: '2',
  },
  {
    title: 'Speaking of templating engines...',
    content: 'Curse be to this damn thing. Challenging my indestructible wisdom.',
    user_id: '4',
  },
  {
    title: 'When designing an MVC pattern...',
    content: 'Start with the model, followed by the controller, then the view.',
    user_id: '3',
  },
  {
    title: 'Coding bootcamps',
    content:
      "You'll be drowned in web development, in such a short amount of time. As difficult as it is, I can definitely say that I've learned a lot.",
    user_id: '1',
  },
];

const seedPosts = () => Post.bulkCreate(newPosts);

module.exports = seedPosts;
