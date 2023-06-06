import "../scss/styles.scss";

// const videos = document.querySelectorAll(".video-container");

// console.log(videos);
// var intersectionObserver = new IntersectionObserver(function (entries) {
//     entries.map((entry) => {
//         if (entry.isIntersecting) {
//             console.log(entry.target);
//         }
//     });
// });

// // 주시 시작
// videos.forEach((video) => intersectionObserver.observe(video));

//home
(() => {
    const modal = document.querySelector(".modal");
    const profile = document.querySelector(".profile");

    if (profile) {
        const modalHander = (e) => {
            modal.classList.toggle("hidden");
            document.querySelector("main").addEventListener("click", () => {
                modal.classList.add("hidden");
            });
        };
        profile.addEventListener("click", modalHander);
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
