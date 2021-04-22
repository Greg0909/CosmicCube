// Set constraints for the video stream
var constraints = { video: true, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Define variables
let cameras = []
let currentCamera = 0;
if(localStorage.getItem("currentCamera"))
{
    currentCamera = localStorage.getItem("currentCamera");
}

// Access the device camera and stream to cameraView
function cameraStart() {

    navigator.mediaDevices.enumerateDevices().then(
        function(devices) {
        
            for(let i=0; i<devices.length; i++){
                if(devices[i].kind == "videoinput"){
                    cameras.push(   [devices[i].deviceId , devices[i].label]   );
                    }
            }
        }
    );

    navigator.mediaDevices.getUserMedia(constraints).then(
        function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        }
    ).catch(
        function(error) {
            console.error("Oops. Something is broken.", error);
        }
    );
}

// Change camera when NextCamera button clicked
document.getElementById("nextCamera").onclick = () => {
    var defaultsOpts = { audio: false, video: true };
    defaultsOpts.video = { deviceId: cameras[currentCamera][0] };
    
    if ( currentCamera < cameras.length-1 ){
        currentCamera++;
    }
    else{
        currentCamera = 0;
    }

    localStorage.setItem("currentCamera", currentCamera);

    navigator.mediaDevices.getUserMedia(defaultsOpts).then(
        function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            console.log(defaultsOpts);
        }
    );
};

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    analyzeImage( cameraSensor.toDataURL("image/jpeg"));
    cameraOutput.classList.add("taken");
    sendMessage("Se tomo la foto c:");
    // track.stop();
};

function sendMessage(message){
    firebase.database().ref("UniqueUser/message").set(
        message
    );
}