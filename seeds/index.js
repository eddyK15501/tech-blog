const sequelize = require("../config/connection");

const seedUsers = require("./userData");
const seedPosts = require("./postData");
const seedComments = require("./commentData");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    seedPosts();
    console.log("\n----- POSTS SEEDED -----\n");

    seedComments();
    console.log("\n----- COMMENTS SEEDED -----\n");

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

seedAll();
