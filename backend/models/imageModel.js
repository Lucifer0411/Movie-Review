import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
 
});

export const Image=mongoose.model('Image',ImageSchema);
