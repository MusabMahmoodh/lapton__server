import mongoose from "mongoose";
import Subject from "./subjectModel.js";
import Product from "./productModel.js";

// Unit --> mechanics...
const unitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    headings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Heading",
      },
    ],
  },

  {
    timestamps: true,
  }
);

unitSchema.post("remove", (document) => {
  const unitId = document._id;
  Subject.find({ units: { $in: [unitId] } }).then((v) => {
    Promise.all(
      v.map((unit) =>
        Subject.findOneAndUpdate(
          { _id: unit._id },
          { $pull: { units: unitId } },
          { new: true }
        )
      )
    );
  });
  Product.find({ unit: unitId }).then((v) => {
    Promise.all(
      v.map((unit) =>
        Product.findOneAndUpdate(
          { _id: unit._id },
          { unit: null },
          { new: true }
        )
      )
    );
  });
});

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;
