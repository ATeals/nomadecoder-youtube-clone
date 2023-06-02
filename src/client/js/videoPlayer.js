const video = document.querySelector("video");
const videoContainer = document.querySelector(".videoContainer");

const playBtn = document.querySelector(".play");
const muteBtn = document.querySelector(".mute");
const volume = document.querySelector(".volume");

const currentTime = document.querySelector(".currentTime");
const totalTime = document.querySelector(".totalTime");
const timeLine = document.querySelector(".timeLine");

const fullScreenBtn = document.querySelector(".fullScreen");

video.volume = 0.5;
let useVolume;

const formatTime = (second) => new Date(second * 1000).toISOString().substring(11, 19);

const playhander = () => {
    video.paused ? video.play() : video.pause();
    playBtn.innerHTML = video.paused ? "Play" : "Pause";
};

const muteHander = () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? "Unmute" : "Mute";
    volume.value = video.muted ? 0 : useVolume;
};

const volumeHander = (e) => {
    video.volume = e.target.value;
    useVolume = video.volume;
    if (video.volume === 0) muteHander();
};

const totalVideoTime = () => {
    totalTime.innerHTML = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
};

const checkVideoTime = () => {
    currentTime.innerHTML = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
};

const timeLineHander = (e) => {
    video.currentTime = e.target.value;
    console.log(e.target.value);
};

const fullScreenHander = () => {
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen) {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerHTML = "Exit";
    } else {
        document.exitFullscreen();
        fullScreenBtn.innerHTML = "Full Screen";
    }
};

playBtn.addEventListener("click", playhander);

muteBtn.addEventListener("click", muteHander);
volume.addEventListener("input", volumeHander);

video.addEventListener("loadedmetadata", totalVideoTime);
video.addEventListener("timeupdate", checkVideoTime);

timeLine.addEventListener("input", timeLineHander);

fullScreenBtn.addEventListener("click", fullScreenHander);

video.addEventListener("ended", () => {
    const { id } = videoContainer.dataset;

    fetch(`/api/videos/${id}/view`, {
        method: "post",
    });
});
