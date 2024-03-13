import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    blogs_comments: [{ type: String}],
    blog_likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like"}]
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
