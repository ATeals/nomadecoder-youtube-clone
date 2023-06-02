const videoContainer = document.querySelector(".videoContainer");
const form = document.getElementById("comment__form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    const { id } = videoContainer.dataset;

    if (text === "") return;

    fetch(`/api/videos/${id}/comment`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    });
});
