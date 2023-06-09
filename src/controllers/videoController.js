import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import fs from "fs";

export const home = async (req, res) => {
    const videos = await Video.find({}).populate("owner").sort({ createdAt: "desc" });

    res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id)
        .populate("owner")
        .populate({
            path: "comments",
            populate: { path: "owner" },
        });

    if (!video) {
        return res.render("404", { pageTitle: "Not Found" });
    }

    return res.render("video/watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const {
        user: { _id },
    } = req.session;

    if (!video) {
        return res.status(404).render("404", { pageTitle: "Not Found" });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("video/edit", { pageTitle: `Edit ${video.title} `, video });
};
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });

    if (!video) {
        return res.render("404", { pageTitle: "Not Found" });
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });

    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("video/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    const {
        user: { _id },
    } = req.session;
    const { path: fileUrl } = req.file;
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            fileUrl,
            owner: _id,
        });

        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();

        return res.redirect("/");
    } catch (error) {
        return res.status(404).render("video/upload", {
            pageTitle: "Upload Video",
            error: error._message,
        });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const {
        user: { _id },
    } = req.session;

    if (!video) {
        return res.status(404).render("404", { pageTitle: "Not Found" });
    }

    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }

    await User.updateOne(
        { _id },
        {
            $pull: {
                videos: video._id,
            },
        }
    );

    fs.unlink(video.fileUrl, function (err) {
        if (err) {
            console.log("Error : ", err);
        }
    });

    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { title } = req.query;
    if (title) {
        const videos = await Video.find()
            .or([
                {
                    title: {
                        $regex: new RegExp(`${title}`, "i"),
                    },
                },
                {
                    hashtags: {
                        $elemMatch: {
                            $regex: new RegExp(`${title}`, "i"),
                        },
                    },
                },
                {
                    description: {
                        $regex: new RegExp(`${title}`, "i"),
                    },
                },
            ])
            .populate("owner");

        return res.render("search", { pageTitle: "Search", videos });
    }

    const videos = await Video.find().populate("owner");
    return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.sendStatus(404);
    }

    video.meta.views += 1;
    await video.save();

    return res.sendStatus(200);
};

export const createComment = async (req, res) => {
    const {
        params: { id },
        body: { text },
        session: { user },
    } = req;
    const video = await Video.findById(id);

    if (!video) return res.sendStatus(404);

    const commnet = await Comment.create({
        text,
        owner: user._id,
        video: id,
    });
    video.comments.push(commnet._id);
    video.save();

    return res.sendStatus(201);
};

export const deleteComment = async (req, res) => {
    const {
        params: { id },
        body: { videoId },
    } = req;
    const comment = await Comment.findById(id);

    if (!comment) {
        return res.sendStatus(404);
    }

    await Comment.findByIdAndDelete(id);

    await Video.updateOne(
        { _id: videoId },
        {
            $pull: {
                comments: id,
            },
        }
    );

    return res.sendStatus(200);
};
