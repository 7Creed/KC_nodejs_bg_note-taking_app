const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  { timestamp: true }
);

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
