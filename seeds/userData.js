const { User } = require("../models");

const newUsers = () => [
  {
    username: "carolinaBoy_501",
    email: "fifteenBackwoods@yahoo.com",
    password: "qwer1234",
  },
  {
    username: "ChanelBags<3",
    email: "karen@gmail.com",
    password: "qwer1234",
  },
  {
    username: "bruised4Skin",
    email: "uncutwarriors@gmail.com",
    password: "qwer1234",
  },
  {
    username: "conor_mcgregor",
    email: "uLitlf00knWeeZl@hotmail.com",
    password: "qwer1234",
  },
];

const seedUsers = async () => await User.bulkCreate(newUsers);

module.exports = seedUsers;
