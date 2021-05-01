import mongoose from "mongoose";
import Product from "./productModel.js";

//Subject (Physics,Chem....)
const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },

  {
    timestamps: true,
  }
);
subjectSchema.post("remove", (document) => {
  const subjectId = document._id;
  Product.find({ category: subjectId }).then((v) => {
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
const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
