const videoContainer = document.querySelector(".videoContainer");
const form = document.getElementById("comment__form");

// const addComment = (text) => {
//     const videoComments = document.querySelector(".video__comments ul");
//     const newComment = document.createElement("li");
//     newComment.className = "video__comment";
//     const icon = document.createElement("i");
//     icon.className = "fas fa-comment";
//     const span = document.createElement("span");
//     span.innerText = ` ${text}`;
//     newComment.appendChild(icon);
//     newComment.appendChild(span);
//     videoComments.prepend(newComment);
// };

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    const { id } = videoContainer.dataset;

    if (text === "") return;

    e.target[0].value = "";
    const { status } = await fetch(`/api/videos/${id}/comment`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    });
    if (status === 404) return;
    // addComment(text);
});
