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
  alias: String,
  active: Boolean,
  avatar: String,
});

export default mongoose.model("Center", CenterSchema);