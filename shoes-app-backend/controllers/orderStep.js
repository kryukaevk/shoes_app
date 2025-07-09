const OrderStep = require("../models/OrderStep");

// add
function addOrderStep(step) {
  return OrderStep.create(step);
}

function getOrderSteps() {
  return OrderStep.find();
}

function getOrderStep(id) {
  return OrderStep.findById(id);
}

module.exports = {
  addOrderStep,
  getOrderSteps,
  getOrderStep,
};
