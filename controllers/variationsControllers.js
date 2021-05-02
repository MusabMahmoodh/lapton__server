import asyncHandler from "express-async-handler";
import Subject from "../models/subjectModel.js";
import Unit from "../models/unitModel.js";
import Heading from "../models/headingModel.js";

/**
 * For subjects
 */
// @desc    Fetch all Variation
// @route   GET /api/Variation
// @access  Public
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find()

    .populate({
      path: "units",

      populate: {
        path: "headings",
        model: "Heading",
      },
    })
    .sort({ createdAt: 1 })
    .exec();
  res.json({ subjects });
});

/**
 * For units
 */
const getUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find()
    .populate({
      path: "headings",
      select: "name",
    })
    .sort({ createdAt: "desc" })
    .exec();
  res.json({ units });
});
const getHeadings = asyncHandler(async (req, res) => {
  const headings = await Heading.find().sort({ createdAt: "desc" }).exec();
  res.json({ headings });
});

// @desc    Fetch single Variation
// @route   GET /api/sub/:id
// @access  Public
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
    .populate({
      path: "units",
      populate: {
        path: "headings",
        model: "Heading",
      },
    })
    .exec();

  if (subject) {
    res.status(200).json(subject);
  } else {
    res.status(404);
    throw new Error("Subject not found");
  }
});
// @desc    Fetch single Variation
// @route   GET /api/sub/:id
// @access  Public
const getUnitById = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id)
    .populate({
      path: "headings",
      select: "name",
    })
    .exec();
  // console.log(variation);
  if (unit) {
    res.status(200).json(unit);
  } else {
    res.status(404);
    throw new Error("Unit not found");
  }
});
const getHeadingById = asyncHandler(async (req, res) => {
  const heading = await Heading.findById(req.params.id);
  // console.log(variation);
  if (heading) {
    res.status(200).json(heading);
  } else {
    res.status(404);
    throw new Error("Heading not found");
  }
});

// // @desc    Delete a Variation
// // @route   DELETE /api//:id
// // @access  Private/Admin
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (subject) {
    await subject.remove();
    res.json({ message: "subject removed" });
  } else {
    res.status(404);
    throw new Error("subject not found");
  }
});
// // @desc    Delete a SubVariation
// // @route   DELETE /api/sub/:id
// // @access  Private/Admin
const deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  try {
    if (unit) {
      await unit.remove();
      res.json({ message: "unit removed" });
    } else {
      throw new Error("unit not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});
const deleteHeading = asyncHandler(async (req, res) => {
  const heading = await Heading.findById(req.params.id);
  try {
    if (heading) {
      await heading.remove();
      res.json({ message: "heading removed" });
    } else {
      throw new Error("heading not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

// // @desc    Create a Variation
// // @route   POST /api/Variation
// // @access  Private/Admin
const createSubject = asyncHandler(async (req, res) => {
  const subject = new Subject({
    name: "New  subject",
  });

  const createdSubject = await subject.save();
  res.status(201).json(createdSubject);
});
// // @desc    Create a Variation
// // @route   POST /api/Variation
// // @access  Private/Admin
const createUnit = asyncHandler(async (req, res) => {
  const unit = new Unit({
    name: "new unit",
  });

  const createdSubunit = await unit.save();
  res.status(201).json(createdSubunit);
});
const createHeading = asyncHandler(async (req, res) => {
  const heading = new Heading({
    name: "new hading",
  });

  const createdHeading = await heading.save();
  res.status(201).json(createdHeading);
});

// // @desc    Update a Variation
// // @route   PUT /api/variation/:id
// // @access  Private/Admin
const updateSubject = asyncHandler(async (req, res) => {
  const { name, units, description } = req.body;
  console.log(units);
  const subject = await Subject.findById(req.params.id);

  if (subject) {
    subject.name = name;
    subject.units = units;
    subject.description = description;
    // console.log(subject);
    const updatedsubject = await subject.save();
    res.json(updatedsubject);
  } else {
    res.status(404);
    throw new Error("Variation not found");
  }
});
const updateUnit = asyncHandler(async (req, res) => {
  const { name, headings } = req.body;

  const unit = await Unit.findById(req.params.id);
  // console.log(unit);
  if (unit) {
    unit.name = name;
    unit.headings = headings;

    const updatedUnit = await unit.save();
    res.json(updatedUnit);
  } else {
    res.status(404);
    throw new Error("unit not found");
  }
});
const updateHeading = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const heading = await Heading.findById(req.params.id);
  // console.log(heading);
  if (heading) {
    heading.name = name;

    const updatedHeading = await heading.save();
    res.json(updatedHeading);
  } else {
    res.status(404);
    throw new Error("heading not found");
  }
});

export {
  getSubjects,
  createSubject,
  getSubjectById,
  deleteSubject,
  updateSubject,
  getHeadings,
  createHeading,
  getHeadingById,
  deleteHeading,
  updateHeading,
  getUnits,
  createUnit,
  getUnitById,
  deleteUnit,
  updateUnit,
};
