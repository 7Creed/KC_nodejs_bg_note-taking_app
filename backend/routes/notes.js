var express = require("express");
const checkIfLoggedIn = require("../middleware/checkIfUserIsLoggedIn");
const noteModel = require("../model/notesModel");
const userModel = require("../model/usersModel");
var router = express.Router();

router.use(checkIfLoggedIn);

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/", async function (req, res, next) {
  try {
    const notes = await noteModel.find({ owner: req.userDetails.userId });

    res.send({ notes });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", async function (req, res, next) {
  try {
    const profile = await userModel.findById(
      req.userDetails.userId,
      "-password"
    );
    // console.log(profile);

    res.send({
      profile,
    });
    // res.send({
    //   profile: await userModel.findById(req.userDetails.userId, "-password"),
    // });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const notes = await noteModel.findById(req.params.id);

    res.send({ notes });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    req.body.owner = req.userDetails.userId;
    const notes = await noteModel.create(req.body);

    res.status(201).send({ notes });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const noteDetails = await noteModel.findById(req.params.id);

    if (req.userDetails.userId != noteDetails.owner.toString()) {
      return res.status(401).send({
        message: "You are not authorized totake this action",
      });
    }

    const notes = await noteModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.send({ notes });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const noteDetails = await noteModel.findById(req.params.id);

    if (req.userDetails.userId != noteDetails.owner.toString()) {
      return res.status(401).send({
        message: "You are not authorized totake this action",
      });
    }
    const notes = await noteModel.findByIdAndDelete(req.params.id);

    res.send({ notes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
