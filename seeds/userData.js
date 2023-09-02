const { User } = require("../models");

const newUsers = () => [
  {
    username: "carolinaBoy_501",
    email: "fifteenBackwoods@yahoo.com",
    password: "qwer1234",
  },
  {
    username: "DungSlinger5",
    email: "dirty4skin@gmail.com",
    password: "qwer1234",
  },
  {
    username: "uLitlWeeZL",
    email: "conorMcGregor@hotmail.com",
    password: "qwer1234",
  },
];

const seedUsers = () => User.bulkCreate(newUsers);

module.exports = seedUsers;
