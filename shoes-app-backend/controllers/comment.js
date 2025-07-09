const Comment = require("../models/Comment");
const Product = require("../models/Product");

function getComments() {
  return Comment.find().populate("author");
}

// add
async function addComment(productId, comment) {
  // Создаем комментарий с привязкой к продукту
  const newComment = await Comment.create({
    ...comment,
    product: productId,
  });

  await Product.findByIdAndUpdate(productId, {
    $push: { comments: newComment._id },
  });

  await newComment.populate("author");

  return newComment;
}

// delete
async function deleteComment(productId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await Product.findByIdAndUpdate(productId, {
    $pull: { comments: commentId },
  });
}

module.exports = {
  getComments,
  addComment,
  deleteComment,
};
