// const startBtn = document.querySelector(".startBtn");
// const video = document.querySelector(".preview");

// let stream;
// let recorder;

// const handleStart = () => {
//     startBtn.innerText = "Stop Recording";

//     recorder = new MediaRecorder(stream);
//     recorder.ondataavailable = (e) => {
//         const videoFile = URL.createObjectURL(e.data);
//         console.log(videoFile);
//         video.srcObject = null;
//         video.src = videoFile;
//         video.play();
//     };
//     recorder.start();
//     setTimeout(() => {
//         recorder.stop();
//     }, 5000);
// };
// const handleStop = () => {
//     startBtn.innerText = "Start Recording";
// };

// const init = async () => {
//     stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
//     video.srcObject = stream;
//     video.play();
// };

// init();

// startBtn.addEventListener("click", () => {
//     if (startBtn.innerText === "Start Recording") handleStart();
//     else handleStop();
// });
