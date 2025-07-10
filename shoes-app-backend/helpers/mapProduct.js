const { default: mongoose } = require("mongoose");
const mapComment = require("./mapComment");

//http://localhost:3002

module.exports = function (product) {
  const baseUrl = "http://90.156.225.144";
  return {
    id: product._id,
    title: product.title,
    imageUrls: product.image_paths.map((path) => `${baseUrl}${path}`),
    price: product.price,
    categoryId: product.category,
    seasonId: product.season,
    description: product.description,
    manufacturer: product.manufacturer,
    sizes: product.sizes,
    comments: product.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
    registeredAt: product.createdAt,
  };
};
