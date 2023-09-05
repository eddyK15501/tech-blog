const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth.js");

// GET USERS
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!dbUserData || dbUserData.length === 0) {
      res.status(404).json({ message: "No users found." });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE USER
router.get("/:id", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        { model: Post },
        {
          model: Comment,
          include: {
            model: Post,
            attributes: ["id", "title"],
          },
        },
      ],
    });
    if (!dbUserData) {
      res.status(404).json("No user was found.");
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST ~ CREATE NEW USER
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const dbUserData = await User.create({
      username,
      email,
      password,
    });
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.status(201).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT ~ UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const dbUserData = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true,
    });
    if (dbUserData[0] === 0) {
      res.status(404).json({ message: "No user found with this id." });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE ~ DELETE USER
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbUserData = User.destroy({
      where: { id: req.params.id },
    });
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id." });
      return;
    }
    res.status(204).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const dbUserData = await User.create({ username, email, password });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Password must be between 3-30 characters; Check if email address is valid;",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const dbUserData = await User.findOne({
    where: { email: req.body.email },
  });

  if (!dbUserData) {
    res.status(400).json({ message: "No user found with that email address." });
    return;
  }
  const validatePass = dbUserData.validatePassword(req.body.password);

  if (!validatePass) {
    res.status(400).json({ message: "Incorrect password." });
    return;
  }

  req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

    res.json({ user: dbUserData, message: "You are now logged in." });
  });
});

// Logout
router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
