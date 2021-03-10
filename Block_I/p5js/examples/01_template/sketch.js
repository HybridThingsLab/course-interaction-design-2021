// globals
let customFont;
let seconds, milliseconds;

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

}

// draw
function draw() {

  // background
  background(0);

  // get seconds and milliseconds
  let date = new Date();
  seconds = date.getSeconds();
  milliseconds = date.getMilliseconds();

  // seconds as two digits and milliseconds as three digitis if used for typo
  let seconds_two_digits = String(seconds).padStart(2, "0");
  let milliseconds_three_digits = String(milliseconds).padStart(3, "0");

  // show seconds and milliseconds
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(seconds_two_digits + " " + milliseconds_three_digits, width / 2, height / 2);

}