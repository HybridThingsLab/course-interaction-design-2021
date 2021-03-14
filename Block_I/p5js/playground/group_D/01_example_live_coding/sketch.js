let w,h;

let seconds, milliseconds;

function setup() {

  w = windowWidth;
  h = windowHeight;

  createCanvas(w,h);

  noStroke();
  fill(255,0,0);

}

function draw() {

  background(255);

  milliseconds = int(millis() % 60000);
  seconds = milliseconds / 1000;

  fill(255,0,0);
  rect(0,0,map(seconds,0,60,0,w),h);

}