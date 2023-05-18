import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("user/createAccount", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
    const { email, name, username, password, location } = req.body;
    await User.create({
        email,
        name,
        username,
        password,
        location,
    });
    return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See user");
