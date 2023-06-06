const likeBtn = document.querySelector(".likeBtn");
const undoLike = document.querySelector(".undoLike");
const videoContainer = document.querySelector(".videoContainer");

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
