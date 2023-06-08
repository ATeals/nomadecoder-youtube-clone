import express from "express";
import morgan from "morgan";
import { getLikeVideos, logout, profile, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword } from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/changePassword").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", profile);
userRouter.get("/:id/likeVideos", getLikeVideos);

export default userRouter;
