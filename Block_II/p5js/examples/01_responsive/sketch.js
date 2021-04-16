var w = window.innerWidth;
var h = window.innerHeight;  

function setup() {
  canvas=createCanvas(w, h);
}

function draw() {
  background(255,255,128);
  // A rectangle
  noStroke();
  fill(200, 200, 200);
  // uses global variables for width and height
  rect(20,20,w-40,h-40);
  fill(255,0,0);
  ellipse(w/2,h/2,w/1.5,w/1.5)
  }

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w,h);
}