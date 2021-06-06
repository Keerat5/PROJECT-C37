var database;
var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup(){
  canvas = createCanvas(1000,600);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  database = firebase.database();

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

}

function draw(){
  background("red");

  if(isDrawing){
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }

  stroke(0);
  strokeWeight(4);
  noFill();
  for(var i = 0; i < drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for(var j = 0; j < path.length; j++){
    vertex(path[j].x, path[j].y)
    }
    endShape();
  }
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath); 
}
 function endPath(){
   isDrawing = false;
 }


function saveDrawing(){
  var ref = database.ref('drawings');

  var result = ref.push(drawing);
  console.log(result.key);
}

function clearDrawing(){
  console.log("clear");
  drawing = [];
  var ref = database.ref('drawings');
  ref.remove();
}

