img = "";
status = "";
object = [];
song = ""
function preload(){
 
song = loadSound("answer_me.mp3");

}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(640, 420);
    ObjectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
}
function draw(){
    image(video, 0, 0, 640, 420);
    

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        ObjectDetector.detect(video, gotresults);
        for( i=0; i < object.length; i++){

            if(object[i].label == "person"){

                document.getElementById('baby').innerHTML = "Baby Detected" ;
                song.stop();
            }
            else{
                document.getElementById('baby').innerHTML = "Baby Not Detected" ;
                song.play();
            }

            document.getElementById('status').innerHTML = "Status: Object Detected";
            
             fill(r,g,b);
             percent = floor(object[i].confidence * 100);
             text(object[i].label + " " + percent + " % " , object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x , object[i].y, object[i].width, object[i].height);
            


        }
    }

}

function modelloaded(){
    console.log('Model Loaded');
    status = true;
    
}

function gotresults(error, result10){
    if(error){
        console.error(error);
    }
    console.log(result10);
    object = result10;
}