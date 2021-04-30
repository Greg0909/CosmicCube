let firstEntry = true;

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

document.getElementById("clearText").onclick = (e) => {
    document.getElementById("ticketTextDisplay").innerText = "";
}