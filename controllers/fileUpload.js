import express from "express";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
const router = express.Router();

export const upload_file = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {});
    return uploadResponse;
  } catch (err) {
    return err;
  }
};

export default router;
