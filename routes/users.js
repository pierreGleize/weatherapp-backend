var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/signup", async (req, res) => {
  const date = new Date();
  const emailAllReadyExist = await User.findOne({
    email: req.body.email,
  });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: date.getTime(),
  });
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  } else if (emailAllReadyExist) {
    res.json({ result: false, error: "User already exists" });
  } else {
    newUser.save().then((data) => {
      res.json({ result: true, newUser: newUser });
    });
  }
});

router.post("/signin", async (req, res) => {
  const date = new Date();
  const foundUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  // const foundPassword = await User.findOne({
  //   password: req.body.password,
  // });
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  } else if (!foundUser) {
    res.json({ result: false, error: "User not found" });
  } else {
    res.json({ result: true, user: foundUser, date: date.getTime() });
  }
});

module.exports = router;
