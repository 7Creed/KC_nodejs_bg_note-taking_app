var express = require("express");
const userModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var router = express.Router();

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.post("/register", async function (req, res, next) {
  try {
    const { fullName, username, email, password } = req.body;

    const usernameAlreadyExist = await userModel.exists({ username });
    if (usernameAlreadyExist)
      return res.status(409).send({
        message: "User name already taken",
      });

    const emailAlreadyExist = await userModel.exists({ email });
    if (emailAlreadyExist)
      return res.status(409).send({
        message: "Email already exist",
      });

    const hashedPassword = bcrypt.hashSync(password, 10);
    await userModel.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      message: "User created",
    });
  } catch (error) {
    console.error("Error in /register route:", error);

    next(error);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { emailOrUsername, password } = req.body;

    // find, findOne, findById, findByAndUpdate, findOneAndUpdate
    // updateMany, deleteMany, countDocuments, findByAndDelete, findOneAndDelete
    // distinct

    const user = await userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).send({
        message: "User is not found",
      });
    }

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch) {
      return res.status(401).send({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.AUTH_TOKEN
    );

    res.status(200).send({
      message: "Login successful",
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
