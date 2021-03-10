// globals
let customFont;

// preload
function preload() {
  // load data here
}

// setup
function setup() {

  // init canvas
  canvas = createCanvas(600, 600).parent('canvas');

  // init custom fonts
  textFont(customFont);

  offsetMillis = 0;

}

// draw
function draw() {

  // background
  background(0);

  // get seconds and milliseconds
  milliseconds = int(millis() % 60000);
  seconds = int(milliseconds / 1000);

  // show seconds and milliseconds
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(seconds, width / 2, height / 2);

}