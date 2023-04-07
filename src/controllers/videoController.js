let videos = [
    {
        title: "first Video",
        rating: 5,
        comments: 2,
        createdAt: "2Minutes ago",
        views: 59,
        id:1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2Minutes ago",
        views: 59,
        id:1,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2Minutes ago",
        views: 59,
        id:1,
    },
]


export const trending = (req, res) => {
    res.render("home", {pageTitle: "Home", videos});
}
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.send("Edit");
export const search = (req, res)=> res.send("Search video");
export const upload = (req, res)=> res.send("Upload video");
export const remove = (req, res)=> res.send("remove video"); 
