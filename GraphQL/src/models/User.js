import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: Schema.Types.String
  },
  lastName: {
    type: Schema.Types.String
  },
  hashPassword: {
    type: Schema.Types.String
  },
  settings: {
    type: Schema.Types.Array
  },
  role: {
    type: Schema.Types.String
  },
  email: {
    type: Schema.Types.String
  }
});

export default mongoose.model("User", User);
