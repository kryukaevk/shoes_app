const Product = require("../models/Product");
const Comment = require("../models/Comment");

// add
async function addProduct(product) {
  const newProduct = await Product.create({
    ...product,
    image_paths: product.image_paths,
  });

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

// edit
async function editProduct(id, product) {
  const existingProduct = await Product.findById(id);
  const newProduct = await Product.findByIdAndUpdate(
    id,
    {
      ...product,
      image_paths: product.image_paths
        ? product.image_paths
        : existingProduct.image_paths,
    },
    {
      returnDocument: "after",
    }
  );

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

//delete
async function deleteProduct(id) {
  await Comment.deleteMany({ product: id });

  return Product.deleteOne({ _id: id });
}

// get all products with pagination
async function getProducts(limit = 8, page = 1, filters = {}) {
  const query = {};
  if (filters.categoryId) {
    query.category = filters.categoryId;
  }
  if (filters.seasonId) {
    query.season = filters.seasonId;
  }
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }
  if (filters.size) {
    query.sizes = filters.size;
  }
  if (filters.search) {
    query.title = { $regex: filters.search, $options: "i" };
  }

  const [products, count] = await Promise.all([
    Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

// get products by search
async function searchProducts(search = "") {
  const products = await Product.find({
    title: { $regex: search, $options: "i" },
  }).sort({ createdAt: -1 });

  return products;
}

// get item
async function getProduct(id) {
  const product = await Product.findById(id).populate({
    path: "comments",
    populate: {
      path: "author",
      select: "login",
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  searchProducts,
  getProduct,
};
