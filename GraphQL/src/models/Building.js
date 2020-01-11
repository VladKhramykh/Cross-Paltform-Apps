import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Buildings = new Schema({
  additionsId: {
    type: [Schema.Types.ObjectId],
    default: null
  },
  rooms: {
    type: [Schema.Types.ObjectId],
    default: null
  },
  concerts: {
    type: [Schema.Types.ObjectId],
    default: null
  },
  location: {
    type: Schema.Types.Array,
    default: null
  },
  city: {
    type: Schema.Types.String,
    required: true
  },
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    default: null
  }
});

export default mongoose.model("Buildings", Buildings);
