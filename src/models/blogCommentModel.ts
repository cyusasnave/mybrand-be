import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogCommentSchema = new Schema({
    user: {
        type: String
    },
    comment: {
        type: String,
        required: true
    },
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
},
    { timestamps: true }
)

export default mongoose.model("Comment", blogCommentSchema)