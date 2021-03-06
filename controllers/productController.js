import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Lab from "../models/labModel.js";
import { upload_file } from "./fileUpload.js";
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // const pageSize = 20;
  // const page = Number(req.query.page) || 1;
  // console.log("here");
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const cat = req.query.category
    ? {
        ...keyword,
        category: req.query.category,
      }
    : { ...keyword };
  const subject = req.query.subject
    ? {
        ...cat,
        subject: req.query.subject,
      }
    : { ...cat };
  const unit = req.query.topic
    ? {
        ...subCat,
        unit: req.query.unit,
      }
    : { ...subject };
  const heading = req.query.topic
    ? {
        ...subCat,
        heading: req.query.heading,
      }
    : { ...unit };
  const search = req.query.topic
    ? {
        ...subCat,
        name: req.query.name,
      }
    : { ...heading };

  // console.log(search);
  try {
    // const count = await Product.countDocuments({ ...search });
    // const length = (
    // await Product.find({ ...search })
    //   .select("name")
    //   .exec();
    // ).length;
    const labs = await Lab.find({ ...search })
      .select([
        "-createdAt",
        "-updatedAt",
        "-tags",
        "-isRecommended",
        "-unit",
        "-imageUrl",
      ])
      .sort({ name: "desc" })
      .populate({
        path: "category",
        select: ["-createdAt", "-updatedAt"],
      })
      .populate({
        path: "subject",
        select: ["-createdAt", "-updatedAt"],
      })
      .populate({
        path: "heading",
        select: ["-createdAt", "-updatedAt"],
      })

      .exec();
    const products = await Product.find({ ...search })
      .select(["-createdAt", "-updatedAt", "-tags", "-isRecommended", "-unit"])
      .sort({ createdAt: "desc" })
      .populate({
        path: "category",
        select: ["-createdAt", "-updatedAt"],
      })
      .populate({
        path: "subject",
        select: ["-createdAt", "-updatedAt"],
      })
      .populate({
        path: "heading",
        select: ["-createdAt", "-updatedAt"],
      })

      .exec();
    // console.log(products, keyword);
    // console.log({ length });
    // res.json({ length, products, page, pages: Math.ceil(count / pageSize) });

    res.json({ products, labs });
  } catch (err) {
    // console.log(err);
    res.json({ message: err.message });
  }

  // console.log(products);
});
const getLessons = asyncHandler(async (req, res) => {
  // const pageSize = 20;
  // const page = Number(req.query.page) || 1;

  try {
    const products = await Product.find({
      category: "608fdd1616a9220015c3838e",
      heading: req.params.id,
    })
      .select(["-createdAt", "-updatedAt", "-category", "-subject"])
      .sort({ createdAt: "asc" })
      .exec();
    // console.log(products, keyword);
    // console.log({ length });
    // res.json({ length, products, page, pages: Math.ceil(count / pageSize) });
    res.json({ products });
  } catch (err) {
    err;
    res.json({ message: err.message });
  }

  // console.log(products);
});
const getLabs = asyncHandler(async (req, res) => {
  // const pageSize = 20;
  // const page = Number(req.query.page) || 1;

  try {
    const products = await Product.find({
      category: "608fdd0a16a9220015c3838d",
    })
      .select(["-createdAt", "-updatedAt", "-category"])
      .sort({ createdAt: "asc" })
      .exec();
    // console.log(products);
    // console.log({ length });
    // res.json({ length, products, page, pages: Math.ceil(count / pageSize) });
    res.json({ products });
  } catch (err) {
    // console.log(err);
    res.json({ message: err.message });
  }

  // console.log(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "subject",
      select: "name",
    })
    .populate({
      path: "unit",
      select: "name",
    })
    .populate({
      path: "heading",
      select: "name",
    });
  // console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "New product",
    image: "",
    author: "",
    description: "",

    author: "",
    resourceUrl: "",
    category: null,
    subject: null,
    unit: null,
    heading: null,
    tags: "",
    description: "",
    duration: "",
  });

  try {
    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    author,
    resourceUrl,
    category,
    subject,
    unit,
    heading,
    tags,
    description,
    duration,
    isRecommended,
  } = req.body;
  // console.log(req.body);
  try {
    const product = await Product.findById(req.params.id);
    // console.log(product);
    if (product) {
      if (image.data) {
        const newImage = await upload_file(image.data);
        product.image = newImage.secure_url;
      } else {
        product.image = image;
      }

      product.name = name;

      product.author = author;
      product.resourceUrl = resourceUrl;
      product.category = category;
      product.subject = subject;
      product.unit = unit;
      product.heading = heading;
      product.tags = tags;
      product.duration = duration;
      product.description = description;
      product.isRecommended = isRecommended;

      if (category === "" || category === undefined) {
        product.category === null;
      } else if (subject === "" || subject === undefined) {
        product.subject = null;
        product.unit = null;
        product.heading = null;
      } else if (unit === "" || unit === undefined) {
        product.unit = null;
        product.heading = null;
      } else if (heading === "" || heading === undefined) {
        product.heading = null;
      }

      const updatedProduct = await product.save();
      // console.log(updatedProduct);
      res.json(updatedProduct);
    } else {
      res.status(404);

      throw new Error("Product not found");
    }
  } catch (error) {
    // console.log(error);
    res.status(204).json({ message: "Failed Updating" });
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error("Product already reviewed");
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     };

//     product.reviews.push(review);

//     product.numReviews = product.reviews.length;

//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ message: "Review added" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isRecommended: true })
    .sort({ createdAt: "desc" })
    .exec();
  // console.log(products);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
  getLessons,
  getLabs,
};
