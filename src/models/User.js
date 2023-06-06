import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: false },
    name: { type: String, require: true },
    location: String,
    socialOnly: { type: Boolean, default: false },
    avatarUrl: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    likeVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
