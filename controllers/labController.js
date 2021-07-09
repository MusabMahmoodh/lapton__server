import asyncHandler from "express-async-handler";
import Lab from "../models/labModel.js";

// @desc    Fetch all Category
// @route   GET /api/Category
// @access  Public
const getLab = asyncHandler(async (req, res) => {
  const labs = await Lab.find().sort({ createdAt: "desc" }).exec();
  res.json({ labs });
});

// @desc    Fetch single Category
// @route   GET /api/Category/:id
// @access  Public
const getLabById = asyncHandler(async (req, res) => {
  const lab = await Lab.findById(req.params.id).exec();

  if (lab) {
    res.json(lab);
  } else {
    res.status(404);
    throw new Error("Lab not found");
  }
});

// // @desc    Delete a Category
// // @route   DELETE /api/Category/:id
// // @access  Private/Admin
const deleteLab = asyncHandler(async (req, res) => {
  const lab = await Lab.findById(req.params.id);

  if (lab) {
    await lab.remove();
    res.json({ message: "lab removed" });
  } else {
    res.status(404);
    throw new Error("lab not found");
  }
});

// // @desc    Create a Category
// // @route   POST /api/Category
// // @access  Private/Admin
const createLab = asyncHandler(async (req, res) => {
  const lab = new Lab({
    name: "New lab",
  });

  const createdLab = await lab.save();
  res.status(201).json(createdLab);
});

// // @desc    Update a Category
// // @route   PUT /api/Category/:id
// // @access  Private/Admin
const updateLab = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    englishUrl,
    tamilUrl,
    demoUrl,
    category,
    subject,
    unit,
    heading,
    tags,
  } = req.body;
  try {
    const lab = await Lab.findById(req.params.id);

    if (lab) {
      lab.name = name;
      lab.imageUrl = imageUrl;
      lab.englishUrl = englishUrl;
      lab.tamilUrl = tamilUrl;
      lab.demoUrl = demoUrl;
      lab.category = category;
      lab.subject = subject;
      lab.unit = unit;
      lab.heading = heading;
      lab.description = description;
      lab.tags = tags;
      lab.description = description;

      // console.log(category);
      const updatedLab = await lab.save();
      // console.log(updateCategory);
      res.json(updatedLab);
    } else {
      res.status(404);
      throw new Error("Lab not found");
    }
  } catch (error) {
    console.log(error);
  }
});

export { getLab, createLab, getLabById, deleteLab, updateLab };
