// globals
let w = 800;
let h = 800;

function setup() {

  createCanvas(w, h);
  angleMode(DEGREES);
}

function draw() {

  background(255);

  // get milliseconds, seconds, minutes and hours
  let date = new Date();
  let milliseconds = date.getMilliseconds();
  let seconds = date.getSeconds();

  // map values to degree circle
  let ms = map(milliseconds, 0, 1000, 0, 360);
  let s = map(seconds, 0, 60, 0, 360);

  // draw background clock
  fill(0);
  noStroke();
  ellipse(w / 2, h / 2, w / 2, w / 2);

  // milliseconds
  push();
  translate(w / 2, h / 2);
  rotate(ms);
  stroke(0, 255, 0);
  strokeWeight(3);
  line(0, 0, 0, -180);
  pop();

  // seconds
  push();
  translate(w / 2, h / 2);
  rotate(s);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(0, 0, 0, -180);
  pop();

}