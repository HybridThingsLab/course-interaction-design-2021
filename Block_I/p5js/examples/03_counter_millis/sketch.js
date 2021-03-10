// globals
let customFont;
let offsetMillis;

// preload
function preload() {
  // load data here
  customFont = loadFont('data/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
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
  milliseconds = millis() - offsetMillis;
  if (milliseconds >= 60000) {
    offsetMillis = millis();
  }
  seconds = int(milliseconds / 1000.0);

  // show seconds and milliseconds
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(seconds, width / 2, height / 2);

}