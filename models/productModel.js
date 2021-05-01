import mongoose from "mongoose";

//for every resource
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/lurkstudio/image/upload/v1614069659/xaiseqmqh5scatthwobn.png",
    },
    //author or institute
    author: {
      type: String,
      // required: true,
    },
    resourceUrl: {
      type: String,
      // required: true,
    },
    //type(game/lab..)
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
    duration: {
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

const Product = mongoose.model("Product", productSchema);

export default Product;
