import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Concert = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  date: {
    type: Schema.Types.Date,
    required: true
  },
  description: {
    type: Schema.Types.String,
    default: null
  },
  price: {
    type: Schema.Types.Number,
    required: true
  }
});

export default mongoose.model("Concert", Concert);
