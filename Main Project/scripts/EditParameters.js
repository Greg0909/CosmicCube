let textAreaForTextForUserCheck = document.getElementById("textForUserCheck");
let submitChangesButton = document.getElementById("submitChangesButton");

firebase.database().ref("UniqueUser/textForUserCheck").on("value", function(snapshot) {
    
    if(firstEntry){
        firstEntry = false;
        return;
    }

    let textForUserCheck = snapshot.val();

    if(!textForUserCheck)
        return;

    if(textForUserCheck == "")
        console.log("Error, no se puedo identificar el ticket. Tal vez esa compañia no esta dada de alta en nuestro sistema");

    document.getElementById("editModal").classList.toggle("hided");

    textAreaForTextForUserCheck = document.getElementById("textForUserCheck");

    //textForUserCheck = textForUserCheck.replace(/\n/g, '&#13;&#10;');
    
    console.log("Text for user:", textForUserCheck );

    textAreaForTextForUserCheck.value = textForUserCheck;

    firebase.database().ref("UniqueUser/textForUserCheck").remove();
});

submitChangesButton.onclick = () => {
    textAreaForTextForUserCheck = document.getElementById("textForUserCheck");
    let textEditedParameters = textAreaForTextForUserCheck.value;
    //textEditedParameters = textEditedParameters.replace(/&#13;&#10;/g, '\n');

    document.getElementById("editModal").classList.toggle("hided");

    console.log("Edited Text:", textEditedParameters );
    firebase.database().ref("UniqueUser/textEditedParameters").set(
        textEditedParameters
    );
}