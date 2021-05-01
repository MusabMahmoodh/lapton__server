import mongoose from "mongoose";

const advertisementSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Advertisement = mongoose.model("advertisement", advertisementSchema);

export default Advertisement;
