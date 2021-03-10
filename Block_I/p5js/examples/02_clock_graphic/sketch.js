// https://p5js.org/examples/input-clock.html

let w = 600
let h = 600;

let seconds, milliseconds;

function setup() {

	  createCanvas(w,h);
    rectMode(CENTER);
}

function draw() {
  
  background(255);
  
  // get seconds and milliseconds
  let date = new Date();
  seconds = date.getSeconds();
  milliseconds = date.getMilliseconds();

  s = map(seconds,0,60,0,TWO_PI) - HALF_PI;
  m = map(milliseconds,0,1000,0,TWO_PI) - HALF_PI;
 
  // draw background
  fill(0);
  noStroke();
  ellipse(w/2,h/2,w/2,w/2);

  // milliseconds
  push();
  translate(w/2,h/2);
  rotate(m);
  stroke(0,255,0);
  strokeWeight(5);
  line(0,0,80,80);
  pop();

  // seconds
  push();
  translate(w/2,h/2);
  rotate(s);
  stroke(255,0,0);
  strokeWeight(10);
  line(0,0,80,80);
  pop();

}