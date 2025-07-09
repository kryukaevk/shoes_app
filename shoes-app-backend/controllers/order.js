const Order = require("../models/Order");

// add
function addOrder(step) {
  return Order.create(step);
}

function getOrders(login) {
  if (login) {
    return Order.find({ user_login: login });
  }
  return Order.find();
}

function getOrder(id) {
  return Order.findById(id);
}

// edit
async function updateOrder(id, orderData) {
  const updateOrder = await Order.findByIdAndUpdate(id, orderData, {
    returnDocument: "after",
  });

  return updateOrder;
}

function deleteOrder(id) {
  return Order.deleteOne({ _id: id });
}

module.exports = {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
