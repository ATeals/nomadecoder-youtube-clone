import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
    return res.render("user/createAccount", { pageTitle: "Create Account", error: "" });
};

export const postJoin = async (req, res) => {
    const { email, name, username, password, password2, location } = req.body;
    const avatarUrl = "uploads/avatars/basic.png";
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
            avatarUrl,
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
        return res.redirect("/search");
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("user/login");
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

    return res.redirect("/logout");
};

export const profile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).render("404", { pageTitle: "Not found" });
    }

    const videos = await Video.find({
        owner: id,
    }).populate("owner");

    return res.render("user/profile.pug", { pageTitle: `${user.name}`, user, videos });
};

export const getLikeVideos = async (req, res) => {
    const {
        params: { id },
    } = req;
    const { likeVideos } = await User.findById(id).populate({
        path: "likeVideos",
        populate: { path: "owner" },
    });
    console.log(likeVideos);

    return res.render("user/likeVideos", { likeVideos });
};

export const likeVideo = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;

    const video = await Video.findById(id);
    const user = await User.findById(_id);

    user.likeVideos.push(video._id);
    user.save();

    video.meta.like += 1;
    video.save();

    req.session.user = user;

    return res.sendStatus(200);
};

export const undoLike = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;

    const video = await Video.findById(id);
    const user = await User.findById(_id);

    user.likeVideos = user.likeVideos.filter((videoId) => String(videoId) !== id);
    user.save();

    video.meta.like -= 1;
    video.save();

    req.session.user = user;
    return res.sendStatus(200);
};
