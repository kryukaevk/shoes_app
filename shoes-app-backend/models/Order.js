const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Поле product_id обязательно"],
  },
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
      message: "Должен быть указан хотя бы один путь к изображению",
    },
  },
  size: {
    type: String,
    required: [true, "Поле size обязательно"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Поле quantity обязательно"],
    min: [1, "Количество должно быть больше 0"],
  },
  total_price: {
    type: Number,
    required: [true, "Поле total_price обязательно"],
    min: [0, "Сумма не может быть отрицательной"],
  },
});

const OrderSchema = new mongoose.Schema(
  {
    user_login: {
      type: String,
      required: false,
      trim: true,
    },
    recipient: {
      name: {
        type: String,
        required: [true, "Поле name обязательно"],
        trim: true,
      },
      surname: {
        type: String,
        required: [true, "Поле surname обязательно"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Поле phone обязательно"],
        trim: true,
        match: [/^\+?\d{10,15}$/, "Некорректный формат номера телефона"],
      },
      email: {
        type: String,
        required: [true, "Поле email обязательно"],
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Некорректный email"],
      },
    },
    delivery: {
      delivery_type: {
        type: String,
        required: [true, "Поле delivery_type обязательно"],
        enum: ["courier", "pickup"],
      },
      address: {
        type: String,
        required: function () {
          return this.delivery.delivery_type === "courier";
        },
        trim: true,
      },
      pickup_point: {
        type: String,
        required: function () {
          return this.delivery.delivery_type === "pickup";
        },
        trim: true,
      },
    },
    payment: {
      payment_method: {
        type: String,
        required: [true, "Поле payment_method обязательно"],
        enum: ["card", "cash", "Оплачен"],
      },
    },
    items: [ItemSchema],
    total_sum: {
      type: Number,
      required: [true, "Поле total_sum обязательно"],
      min: [0, "Общая сумма не может быть отрицательной"],
    },
    total_quantity: {
      type: Number,
      required: [true, "Поле total_quantity обязательно"],
      min: [1, "Общее количество должно быть больше 0"],
    },
    processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
