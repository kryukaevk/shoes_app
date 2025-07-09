const mongoose = require("mongoose");

const OrderStepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Поле title обязательно"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderStep = mongoose.model("OrderStep", OrderStepSchema);

module.exports = OrderStep;
