const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Поле title обязательно"],
      trim: true,
    },
    image_paths: {
      type: [String],
      required: [true, "Поле image_paths обязательно"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Должен быть загружен хотя бы один файл изображения",
      },
    },
    price: {
      type: Number,
      required: [true, "Поле price обязательно"],
      min: [0, "Цена не может быть отрицательной"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Поле category_id обязательно"],
    },
    season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: [true, "Поле season_id обязательно"],
    },
    description: {
      type: String,
      required: [true, "Поле description обязательно"],
      trim: true,
    },
    manufacturer: {
      type: String,
      required: [true, "Поле manufacturer обязательно"],
      trim: true,
    },
    sizes: {
      type: [String],
      required: [true, "Поле sizes обязательно"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Должен быть указан хотя бы один размер",
      },
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
