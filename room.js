detection_status = "";
objects = [];

babyFound_Alert = "";
babyNotFound_Alert = "";

function preload(){
    babyFound_Alert = loadSound("BabyFound.wav");
    babyNotFound_Alert = loadSound("BabyNotFound.mp3");
}

function setup(){
    canvas = createCanvas(500, 365);

    video = createCapture(VIDEO);
    video.size(500, 365);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    console.log("CocoSSD Model Loaded Successfully!");
    detection_status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 500, 365);

    if (detection_status != ""){
        objectDetector.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            
            fill("#FF0000");
            textSize(17);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if (objects[i].label == "person"){
                babyNotFound_Alert.stop();

                document.getElementById("found").innerHTML = "Baby Found!";
                babyFound_Alert.play();
            } else {
                babyFound_Alert.stop();

                document.getElementById("found").innerHTML = "Baby Not Found!";
                babyNotFound_Alert.play();
            }
        }
    }
}

function back(){
    setTimeout(function(){
        window.location = "index.html";
    }, 250);
}
