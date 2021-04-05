const inputElement = document.getElementById("ticketImage");
inputElement.addEventListener("change", handleFiles, false);
let exampleImage;
let worker;

function handleFiles() {
    const fileList = this.files; /* now you can work with the file list */

    console.log(fileList[0]);

    exampleImage = URL.createObjectURL(fileList[0])

    console.log(exampleImage);
    document.getElementById("imageDisplay").src = exampleImage;

    worker = Tesseract.createWorker({
    logger: m => console.log(m)
    });
    Tesseract.setLogging(true);
    work();
}

async function work() {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    let result = await worker.detect(exampleImage);
    console.log(result.data);

    result = await worker.recognize(exampleImage);
    let ticketText = result.data.text;

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

    await worker.terminate();
}