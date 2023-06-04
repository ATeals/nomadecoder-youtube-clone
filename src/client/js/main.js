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

(() => {
    const modal = document.querySelector(".modal");
    const profile = document.querySelector(".profile");

    const modalHander = (e) => {
        modal.classList.toggle("hidden");
    };
    profile.addEventListener("click", modalHander);
    document.querySelector("main").addEventListener("click", () => {
        modal.classList.add("hidden");
    });
})();
