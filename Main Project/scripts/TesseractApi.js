let ticketTextDisplay = document.getElementById("ticketTextDisplay");

async function analyzeImage(imageUrl) {
    ticketTextDisplay.innerText = "";
    //imageUrl ="blob:null/0bdc98ff-33e1-4ddc-a37a-11165cf4a65c";

    //imageUrl = URL.createObjectURL(imageUrll)

    console.log( imageUrl );
    //imageUrl = "C:\Users\Greg\Desktop\Files\Cosmic Cube\Tesseract file Example\images\ImagenZoon1.jpeg";
    //exampleImage = URL.createObjectURL(fileList[0])
    //document.getElementById("imageDisplay").src = exampleImage;

    try{
        let worker = Tesseract.createWorker({
            logger: m =>{ 
                console.log(m)
                ticketTextDisplay.innerText += `${m.status} ... ${m.progress}%\n`;
            }
        });
        Tesseract.setLogging(true);
        
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
    
        let result = await worker.detect(imageUrl);
        console.log("Result data: " + result.data);
    
        result = await worker.recognize(imageUrl);
        let ticketText = result.data.text;
        ticketTextDisplay.innerText = ticketText;
    
        await worker.terminate();
    
        sendTciketText( ticketText );
    }
    catch{
        ticketTextDisplay.innerText += `Error en el analisis de la imagen :c\n`;
    }
    
}

function sendTciketText(ticketText){
    firebase.database().ref("UniqueUser/ticketText").set(
        ticketText
    );
}

