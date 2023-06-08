// tictok like button handler
(() => {
    const likeBtn = document.querySelectorAll(".likeBtn");
    const undoLike = document.querySelectorAll(".undoLike");

    console.log(likeBtn, undoLike);

    if (likeBtn != []) {
        likeBtn.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const { id } = e.target.parentNode.parentNode;
                await fetch(`/api/videos/${id}/like`, {
                    method: "post",
                });
                console.log("like");
                window.location.reload();
            });
        });
    }

    if (undoLike) {
        undoLike.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const { id } = e.target.parentNode.parentNode;
                await fetch(`/api/videos/${id}/undoLike`, {
                    method: "post",
                });
                console.log("unlike");
                window.location.reload();
            });
        });
    }
})();

//copy
(() => {
    const copyBtns = document.querySelectorAll(".copyBtn");
    const homeUrl = "http://localhost:4000/";

    copyBtns.forEach((copyBtn) => {
        copyBtn.addEventListener("click", (e) => {
            navigator.clipboard.writeText(homeUrl + e.target.dataset.id).then(() => {
                alert("복사완료");
            });
            console.log(homeUrl + e.target.dataset.id);
        });
    });
})();
