// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "Please add a username"],
//       unique: true,
//       trim: true,
//       minlength: [3, "Username must be at least 3 characters long"],
//       maxlength: [30, "Username cannot be more than 30 characters long"],
//     },
//     password: {
//       type: String,
//       required: [true, "Please add a password"],
//       minlength: [6, "Password must be at least 6 characters long"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("User", userSchema);







import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], default: ["user"] },
});

const User = mongoose.model("User", userSchema);
export default User;
