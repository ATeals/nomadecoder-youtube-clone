import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("user/createAccount", { pageTitle: "Create Account", error: "" });
};
export const postJoin = async (req, res) => {
    const { email, name, username, password, location } = req.body;

    const userExists = await User.exists({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.render("user/createAccount", { pageTitle: "Create Account", error: "This Email / Username is already Taken!!!" });
    }

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
