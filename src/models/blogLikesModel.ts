import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogLikesModel = new Schema({
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }
)

export default mongoose.model("Like", blogLikesModel)