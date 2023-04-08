import express from "express";
import {watch, getEdit, posetEdit, getUpload, postUpload} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(posetEdit)
videoRouter.route("/upload").get(getUpload).post(postUpload)


export default videoRouter;


