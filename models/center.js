import mongoose from "mongoose";

const CenterSchema = mongoose.Schema({
  name: String,
  address: {
    street: String,
    num: Number,
    city: String,
    state: String,
    postcode: String,
    country: String
  },
  alias: {
    type: String,
    unique: true,
  },
  active: Boolean,
});

export default mongoose.model("Center", CenterSchema);