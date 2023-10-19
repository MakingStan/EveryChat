var name = prompt("Please Enter Your Name: ", "Jhon Doe")

const firebaseConfig = {
    apiKey: "AIzaSyCH6ud-Jwem6LAUvNm0fY9apasmIDsKArY",
    authDomain: "everychat-21449.firebaseapp.com",
    databaseURL: "https://everychat-21449-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "everychat-21449",
    storageBucket: "everychat-21449.appspot.com",
    messagingSenderId: "1082362244618",
    appId: "1:1082362244618:web:a335e170f8958557d3b9f3"
 }; 

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var currentTextArray = undefined;
startup();
async function startup()
{
    await addTextMessage(name+" has just joined!");
}

function onButtonClick()
{
    addTextMessage(name+': '+document.getElementById('sendText').value)
}
async function refreshTextField()
{
    let textArrayString = "";

    for(let i = 0; i < currentTextArray.length; i++)
    {
        textArrayString += currentTextArray[i]+"\n";
    }

    document.getElementById("mainText").value = textArrayString;

}



async function addTextMessage(string)
{
    document.getElementById("sendText").value = "";
    await getCurrentTextArray();
    currentTextArray.push(string);

    db.collection("TextData")
    .doc("Text")
    .set({
        "TextArray": currentTextArray,
    })
    .then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });

    await refreshTextField();
}

async function getCurrentTextArray() {
    await new Promise((resolve, reject) => { 
        setTimeout(async () => {
            await db.collection("TextData").doc("Text").get()
            .then((doc) => { 
                console.log("ddd")
                currentTextArray = doc.data().TextArray
            })
            .catch(function (error)
            {
                currentTextArray = undefined;
            });
           resolve(); // also can pass a parameter here to get it via await.
        },0);
   });


   

}