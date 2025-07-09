const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Поле name обязательно"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Season = mongoose.model("Season", SeasonSchema);

module.exports = Season;
