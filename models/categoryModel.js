import mongoose from "mongoose";
import Product from "./productModel.js";
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.post("remove", (document) => {
  const roleId = document._id;
  Product.find({ category: roleId }).then((v) => {
    Promise.all(
      v.map((variation) =>
        Product.findOneAndUpdate(
          variation._id,
          { category: null },
          { new: true }
        )
      )
    );
  });
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
