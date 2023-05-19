import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("user/createAccount", { pageTitle: "Create Account", error: "" });
};
export const postJoin = async (req, res) => {
    const { email, name, username, password, password2, location } = req.body;
    if (password !== password2) {
        return res.status(400).render("user/createAccount", { pageTitle: "Create Account", error: "Password does not Mach" });
    }
    const userExists = await User.exists({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).render("user/createAccount", { pageTitle: "Create Account", error: "This Email / Username is already Taken!!!" });
    }
    try {
        await User.create({
            email,
            name,
            username,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(404).render("/join", {
            pageTitle: "Create Acoount",
            error: error._message,
        });
    }
};
export const getLogin = (req, res) => {
    return res.render("user/login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("user/login", { pageTitle: "LogIn", error: "An account with this username does not exists." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).render("user/login", { pageTitle: "LogIn", error: "Wrong Password" });

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See user");
