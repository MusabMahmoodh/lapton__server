import asyncHandler from "express-async-handler";

import Advertisement from "../models/advertisement.js";
import { upload_file } from "./fileUpload.js";
// @desc    Fetch all Variation
// @route   GET /api/Variation
// @access  Public

const getAdvertisement = asyncHandler(async (req, res) => {
  const advertisement = await Advertisement.find()
    .sort({ createdAt: "desc" })
    .exec();
  res.json({ advertisement });
});

// @desc    Fetch single Variation
// @route   GET /api/sub/:id
// @access  Public
const getAdvertisementById = asyncHandler(async (req, res) => {
  const advertisement = await Advertisement.findById(req.params.id);
  // console.log(advertisement);
  if (advertisement) {
    res.status(200).json(advertisement);
  } else {
    res.status(404);
    throw new Error("advertisement not found");
  }
});

// // @desc    Delete a Advertisement
// // @route   DELETE /api/sub/:id
// // @access  Private/Admin
const deleteAdvertisement = asyncHandler(async (req, res) => {
  const advertisement = await Advertisement.findById(req.params.id);

  if (advertisement) {
    await advertisement.remove();
    res.json({ message: "Advertisement removed" });
  } else {
    res.status(404);
    throw new Error("Advertisement not found");
  }
});

// // @desc    Create a Variation
// // @route   POST /api/Variation
// // @access  Private/Admin
const createAdvertisement = asyncHandler(async (req, res) => {
  const advertisement = new Advertisement({
    image:
      "https://res.cloudinary.com/lurkstudio/image/upload/v1614079757/xgledxeftdfpllcxqqag.png",
  });

  const createdAdvertisement = await advertisement.save();
  res.status(201).json(createdAdvertisement);
});

const updateAdvertisement = asyncHandler(async (req, res) => {
  const { image, description } = req.body;

  // console.log(req.body);
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (advertisement) {
      if (image.data) {
        const newImage = await upload_file(image.data);
        advertisement.image = newImage.secure_url;
      } else {
        advertisement.image = image;
      }
      advertisement.description = description;
      const updatedAdvertisement = await advertisement.save();
      res.json(updatedAdvertisement);
    } else {
      throw new Error("Advertisement not found");
    }
  } catch (error) {
    // console.log(error);
    res.status(404);
  }
});

export {
  getAdvertisement,
  createAdvertisement,
  getAdvertisementById,
  deleteAdvertisement,
  updateAdvertisement,
};
