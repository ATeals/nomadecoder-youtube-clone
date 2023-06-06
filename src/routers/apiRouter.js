import express from "express";
import { createComment, deleteComment, registerView } from "../controllers/videoController";
import { likeVideo, undoLike } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment/delete", deleteComment);

apiRouter.post("/videos/:id([0-9a-f]{24})/like", likeVideo);
apiRouter.post("/videos/:id([0-9a-f]{24})/undoLike", undoLike);

export default apiRouter;
