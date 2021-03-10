// see also
// https: //spicyyoghurt.com/tools/easing-functions

// globals
let w1, w2, w3;

// preload
function preload() {
  // load data here
}

// setup
function setup() {

  // init canvas
  canvas = createCanvas(600, 600).parent('canvas');

}

// draw
function draw() {

  // background
  background(0);

  // get seconds and milliseconds
  milliseconds = int(millis() % 60000);
  seconds = int(milliseconds / 1000);

  // easings
  w1 = map(milliseconds, 0, 60000, 0, width);
  w2 = easeInCubic(w1, 0, width, width);
  w3 = easeOutCubic(w1, 0, width, width);

  rect(0, height / 2 - 128, w1, 8);
  rect(0, height / 2, w2, 8);
  rect(0, height / 2 + 128, w3, 8);


}

// easing functions

function easeInExpo(t, b, c, d) {
  return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
s