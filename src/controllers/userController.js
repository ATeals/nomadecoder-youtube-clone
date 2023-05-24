import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
        return res.status(404).render("user/createAccount", {
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
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("user/login", { pageTitle: "LogIn", error: "An account with this username does not exists." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).render("user/login", { pageTitle: "LogIn", error: "Wrong Password" });

    //이곳에서 세션을 수정
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "user:email read:user",
    };
    const params = new URLSearchParams(config).toString();
    const url = `https://github.com/login/oauth/authorize?${params}`;
    res.redirect(url);
};

export const finishGithubLogin = async (req, res) => {
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const url = `https://github.com/login/oauth/access_token?${params}`;
    const tokenRequest = await (
        await fetch(url, {
            method: "post",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiurl = `https://api.github.com`;
        const userData = await (
            await fetch(`${apiurl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await (
            await fetch(`${apiurl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);

        if (!emailObj) {
            return res.redirect("/login");
        }

        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                email: emailObj.email,
                name: userData.name,
                username: userData.login,
                password: "",
                location: userData.location,
                socialOnly: true,
                avatarUrl: userData.avatar_url,
            });
        }

        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getEdit = (req, res) => {
    return res.render("user/edit", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
    const {
        session: {
            user: { _id, avatarUrl },
        },
        body: { name, email, username, location },
        file,
    } = req;

    console.log(file.path);
    //이미 있는 유저네임이나 이메일 사용시 불가능 하게 만드는 코드!!!

    const updateUser = await User.findByIdAndUpdate(
        _id,
        {
            avatarUrl: file ? file.path : avatarUrl,
            name,
            email,
            username,
            location,
        },
        { new: true }
    );

    req.session.user = updateUser;
    return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly === true) return res.redirect("/users/edit");
    return res.render("user/changePassword", { pageTitle: "Change Pasword" });
};

export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, newPassword2 },
    } = req;

    const user = await User.findById(_id);

    const ok = await bcrypt.compare(oldPassword, user.password);

    if (!ok) return res.status(400).render("user/changePassword", { pageTitle: "Change Pasword", error: "The current password is incorrect" });

    if (newPassword !== newPassword2) {
        return res.status(400).render("user/changePassword", { pageTitle: "Change Pasword", error: "Password Does not match" });
    }

    user.password = newPassword;
    await user.save();

    return res.redirect("/users/logout");
};

export const see = (req, res) => res.send("See user");
