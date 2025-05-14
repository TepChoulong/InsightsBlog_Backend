import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    last_logged_in: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const adminUsers =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default adminUsers;
