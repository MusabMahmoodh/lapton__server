import mongoose from "mongoose";

const labSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/musabcloud/image/upload/v1622721746/emgwhw7rrnzwtp2lfhw0.png",
    },
    englishUrl: {
      type: String,
    },
    tamilUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Category",
    },
    //subject
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Subject",
    },
    //Unit
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Unit",
    },
    //heading (circular motion...)
    heading: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Heading",
    },
    description: {
      type: String,
    },
    tags: {
      type: String,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lab = mongoose.model("Lab", labSchema);

export default Lab;
