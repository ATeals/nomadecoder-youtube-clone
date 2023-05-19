import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.render("404", { pageTitle: "Not Found" });
    }
    return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.render("404", { pageTitle: "Not Found" });
    }

    return res.render("edit", { pageTitle: `Edit ${video.title} `, video });
};
export const posetEdit = async (req, res) => {
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
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch (error) {
        return res.status(404).render("upload", {
            pageTitle: "Upload Video",
            error: error._message,
        });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Not Found" });
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { title } = req.query;
    if (title) {
        const videos = await Video.find({
            title: {
                $regex: new RegExp(`${title}`, "i"),
            },
        });

        return res.render("search", { pageTitle: "Search", videos });
    }
    console.log(req.body);
    return res.render("search", { pageTitle: "Search", videos: [] });
};
