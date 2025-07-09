const Category = require("../models/Category");

// add
function addCategory(category) {
  return Category.create(category);
}

function getCategories() {
  return Category.find();
}

function getCategory(id) {
  return Category.findById(id);
}

module.exports = {
  addCategory,
  getCategories,
  getCategory,
};
