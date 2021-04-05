let ticketTextDisplay = document.getElementById("ticketTextDisplay");

async function analyzeImage(imageUrl) {
    //imageUrl ="blob:null/0bdc98ff-33e1-4ddc-a37a-11165cf4a65c";

    //imageUrl = URL.createObjectURL(imageUrll)

    console.log( imageUrl );
    //imageUrl = "C:\Users\Greg\Desktop\Files\Cosmic Cube\Tesseract file Example\images\ImagenZoon1.jpeg";
    //exampleImage = URL.createObjectURL(fileList[0])
    //document.getElementById("imageDisplay").src = exampleImage;

    let worker = Tesseract.createWorker({
        logger: m => console.log(m)
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

    //extractTicketInfo( ticketText );
}

function extractTicketInfo( ticketText ) { 

    let stationNumberRegex1 = /^[A-Z]+[\d ]+/gi;
    let stationNumberRegex2 = /[\d ]*$/gi;
    let stationNumber = stationNumberRegex2.exec( stationNumberRegex1.exec(ticketText)["0"] )["0"];
    stationNumber = stationNumber.replace(/\s+/g, '');

    let buyDateRegex1 = /Fecha C(.)+/gi;
    let buyDateRegex2 = /(\d\d:\d\d:\d\d)+( )*$/gi;
    let buyDate = buyDateRegex2.exec( buyDateRegex1.exec( ticketText )["0"] )["0"];
    buyDate = buyDate.replace(/\s+/g, '');

    let ticketNumberRegex1 = /ticket([\d ]+)/gi;
    let ticketNumberRegex2 = / [\d ]*$/gi;
    let ticketNumber = ticketNumberRegex2.exec( ticketNumberRegex1.exec( ticketText )["0"] )["0"];
    ticketNumber = ticketNumber.replace(/\s+/g, '');

    console.log("Numero de estacion:", stationNumber);
    console.log("Fecha de Compra:", buyDate);
    console.log("Ticket Number:", ticketNumber);

}