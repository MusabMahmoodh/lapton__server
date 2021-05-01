import mongoose from "mongoose";

import Product from "./productModel.js";
import Unit from "./unitModel.js";

//heading (Circular motion...)
const headingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
headingSchema.post("remove", (document) => {
  const headingId = document._id;
  Unit.find({ headings: { $in: [headingId] } }).then((v) => {
    Promise.all(
      v.map((head) =>
        Subject.findOneAndUpdate(
          { _id: head._id },
          { $pull: { headings: headingId } },
          { new: true }
        )
      )
    );
  });
  Product.find({ heading: headingId }).then((v) => {
    Promise.all(
      v.map((heading) =>
        Product.findOneAndUpdate(
          { _id: heading._id },
          { heading: null },
          { new: true }
        )
      )
    );
  });
});

const Heading = mongoose.model("Heading", headingSchema);

export default Heading;
