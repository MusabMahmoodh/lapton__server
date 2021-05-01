import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc    Fetch all Category
// @route   GET /api/Category
// @access  Public
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find().sort({ name: 1 }).exec();
  res.json({ category });
});

// @desc    Fetch single Category
// @route   GET /api/Category/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).exec();

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// // @desc    Delete a Category
// // @route   DELETE /api/Category/:id
// // @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// // @desc    Create a Category
// // @route   POST /api/Category
// // @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: "New category",
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// // @desc    Update a Category
// // @route   PUT /api/Category/:id
// // @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.description = description;

    // console.log(category);
    const updatedCategory = await category.save();
    // console.log(updateCategory);
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  getCategory,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
