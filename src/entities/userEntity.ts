
import mongoose from "mongoose"

export class User {
    username: string;
    passwd: string;
    permissions: Array<string>;
}

type UserDocument = mongoose.Document & User;

const UserSchema = new mongoose.Schema({
    username: String,
    passwd: String,
    permissions: Array,
}, { timestamps: true })

export const userRepository = mongoose.model<UserDocument>("User", UserSchema)
