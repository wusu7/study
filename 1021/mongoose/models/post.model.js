
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "내용은 필수입니다."],
    },
    author: {
      type: String,
      default: "Anonymous",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

export default mongoose.model("Post", postSchema);


