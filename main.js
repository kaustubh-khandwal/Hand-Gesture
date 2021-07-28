//https://teachablemachine.withgoogle.com/models/COcMU_X8e/model.json
prediction1 = "";
prediction2 = "";

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

Camera = document.getElementById('camera');
Webcam.attach('#Camera');

function takeSnapShot() {
    Webcam.snap(function (Data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+Data_uri+"'>"
    } )
}

console.log(ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/COcMU_X8e/model.json',modelloaded);


function modelloaded() {
    console.log('modelloaded')
}

function speak() {
    synth = window.speechSynthesis;
    speakdata1 = 'The first prediction is' + prediction1;
    speakdata2 = 'And the second prediction is' + prediction2;
    utterthis = new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis)
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("resultemotion_name").innerHTML=result[0].label;
        document.getElementById("resultemotion_name2").innerHTML=result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();

        if (prediction1 == "Best") {
            document.getElementById("resultemoji").innerHTML = "&#128077;";
            console.log(prediction1);
        }
        if (prediction1 == "Victory") {
            document.getElementById("resultemoji").innerHTML = "&#9996;";
        }
        if (prediction1 == "Amazing") {
            document.getElementById("resultemoji").innerHTML = "&#128076";
        }


        if (prediction2 == "Best") {
            document.getElementById("resultemoji2").innerHTML = "&#128077;";
        }
        if (prediction2 == "Victory") {
            document.getElementById("resultemoji2").innerHTML = "&#9996;";
        }
        if (prediction2 == "Amazing") {
            document.getElementById("resultemoji2").innerHTML = "&#128076";
        }
    }
}
//&#128070;