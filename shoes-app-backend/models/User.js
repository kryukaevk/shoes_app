const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      unique: true,
      required: [true, "Поле login обязательно"],
      trim: true,
      minlength: [3, "Логин должен содержать не менее 3 символов"],
    },
    password: {
      type: String,
      required: [true, "Поле password обязательно"],
      minlength: [6, "Пароль должен содержать не менее 6 символов"],
    },
    role: {
      type: Number,
      required: [true, "Поле role_id обязательно"],
      default: roles.BUYER,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
