const videoContainer = document.querySelector(".videoContainer");
const form = document.getElementById("comment__form");
const deleteBtns = document.querySelectorAll(".video__comments-column:first-child button");

//삭제 이벤트
deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const { id } = btn.parentNode;
        const videoId = videoContainer.dataset.id;

        await fetch(`/api/videos/${id}/comment/delete`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                videoId,
            }),
        });

        window.location.reload();
    });
});

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
    window.location.reload();
    // addComment(text);
});

const likeBtn = document.querySelector(".likeBtn");
const undoLike = document.querySelector(".undoLike");

if (likeBtn) {
    likeBtn.addEventListener("click", async () => {
        const { id } = videoContainer.dataset;
        await fetch(`/api/videos/${id}/like`, {
            method: "post",
        });

        window.location.reload();
    });
}
if (undoLike) {
    undoLike.addEventListener("click", async () => {
        const { id } = videoContainer.dataset;
        await fetch(`/api/videos/${id}/undoLike`, {
            method: "post",
        });

        window.location.reload();
    });
}
