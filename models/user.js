import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstname: String,
  lasname: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});

export default mongoose.model("User",UserSchema);
