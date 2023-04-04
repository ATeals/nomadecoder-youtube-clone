
export const trending = (req, res) => res.render("home", {pageTitle: "home"});

export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.send("Edit");

export const search = (req, res)=> res.send("Search video");
export const upload = (req, res)=> res.send("Upload video");
export const remove = (req, res)=> res.send("remove video"); 
