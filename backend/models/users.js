const mongoose = require("mongoose");
//install library for encryption: npm i bcrypt
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nombre es requerido"],
      minLength: 3,
    },
    lastName: {
      type: String,
      required: [true, "Apellido es requerido"],
      minLength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Correo es requerido"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: [true, "Rol es requerido (free,premium,tech,admin)"],
      enum: ["free", "premium", "tech", "admin"],
      default: "free",
    },
    sessionAttempts: {
      type: Number,
      default: 3,
    },
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    resetCode: {
      type: String,
      default: null,
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

UserSchema.statics.generateResetCodeHash = async function (code) {
  const hash = crypto
    .createHash("sha256")
    .update(code.toString())
    .digest("hex");
  return hash;
};

module.exports = mongoose.model("users", UserSchema);
