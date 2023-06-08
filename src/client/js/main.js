import "../scss/styles.scss";

//modal
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
