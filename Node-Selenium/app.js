// Import Admin SDK
var admin = require("firebase-admin");
const {spawn} = require("child_process");

var serviceAccount = require("./cosmiccube-e3806-firebase-adminsdk-e5h7g-57eb6aaea3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cosmiccube-e3806-default-rtdb.firebaseio.com"
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("UniqueUser");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {

    console.log("\n\n");
    const ticketText = snapshot.val().ticketText;
    
    let stationNumber, buyDate, ticketNumber;

    [stationNumber, buyDate, ticketNumber] = extractTicketInfo( ticketText );

    if(stationNumber != null){
        const ls = spawn("python", ['PythonCode/FacturacionAPI.py', '-f', 'EGAS', '-t', ticketNumber, '-e', stationNumber, '-d', buyDate]);

        ls.stdout.on("data", data => {
            console.log(`stdout: ${data} \nEND`);
        });

        ls.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });

        ls.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });

        ls.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });
    }
    



}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


function extractTicketInfo( ticketText ) { 

    try{
        let stationNumberRegex1 = /(\d\d)\d+/gi;
        let stationNumberRegex2 = /[\d ]*$/gi;
        let stationNumber = stationNumberRegex2.exec( stationNumberRegex1.exec(ticketText)["0"] )["0"];
        stationNumber = stationNumber.replace(/\s+/g, '');
    
        console.log("Numero de estacion:", stationNumber);
    
    
        let buyDateRegex1 = /Fecha C(.)+/gi;
        let buyDateRegex2 = /(\d\d:\d\d:\d\d)+( )*$/gi;
        let buyDate = buyDateRegex2.exec( buyDateRegex1.exec( ticketText )["0"] )["0"];
        buyDate = buyDate.replace(/\s+/g, '');
    
        console.log("Fecha de Compra:", buyDate);
    
    
        let ticketNumberRegex1 = /(ticket|cket)([\d ]+)/gi;
        let ticketNumberRegex2 = / [\d ]*$/gi;
        let ticketNumber = ticketNumberRegex2.exec( ticketNumberRegex1.exec( ticketText )["0"] )["0"];
        ticketNumber = ticketNumber.replace(/\s+/g, '');
        
        console.log("Ticket Number:", ticketNumber);

        return [stationNumber, buyDate, ticketNumber];
    }
    catch{
        console.log("Error en la extraccion de la info del ticket");
    }
    return [null, null, null];

}


