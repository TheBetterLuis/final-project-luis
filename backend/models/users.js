const mongoose = require("mongoose");
//install library for encryptio: npm i bcrypt
const bcrypt = require("bcrypt");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      minLength: 3,
    },
    email: {
      type: String,
      unique: true,
      require: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: [true, "role is required (admin,user)"],
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const jumps = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, jumps).then((hashPassword) => {
    return hashPassword;
  });
};

UserSchema.statics.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = mongoose.model("users", UserSchema);
