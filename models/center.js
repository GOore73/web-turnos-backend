import mongoose from "mongoose";

const CenterSchema = mongoose.Schema({
  name: String,
  address: {
    street: String,
    num: Number,
    city: String,
    state: String,
    country: String
  },
  alias: {
    type: String,
    unique: true,
  },
  active: Boolean,
  avatar: String,
});

export default mongoose.model("Center", CenterSchema);