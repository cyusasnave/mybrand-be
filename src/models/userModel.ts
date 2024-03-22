import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * @openapi
 * components
 *   schemas:
 *     CreateNewUser:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - ConfirmPassword
 */

const userModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ConfirmPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    }
}, 
    { timestamps: true }
)

export default mongoose.model("User", userModelSchema)