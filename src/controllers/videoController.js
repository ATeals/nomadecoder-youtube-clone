let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2Minutes ago",
        views: 1,
        id:1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2Minutes ago",
        views: 59,
        id:2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2Minutes ago",
        views: 59,
        id:3,
    },
]


export const trending = (req, res) => {
    res.render("home", {pageTitle: "Home", videos});
}
export const watch = (req, res) =>{ 
    const { id } = req.params;
    const video = videos[id-1];
    res.render("watch", {pageTitle: `Watching : ${video.title}`, video});
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", {pageTitle : `Editing :  ${video.title}`, video});
}
export const posetEdit = (req, res) =>{
    const { id } = req.params;
    const {title} = req.body
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res)=>{


    return res.render("upload", {pageTitle : "Upload Video"});
}

export const postUpload = (req, res)=>{
    const newVideo = {
        title: req.body.title,
        rating: 0,
        comments: 0,
        createdAt: "Just now",
        views: 0,
        id: videos.length + 1,
    };

    videos.push(newVideo);
    return res.redirect("/");
}