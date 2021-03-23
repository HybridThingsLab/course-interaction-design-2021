let data = []; // create an object to hold the data
let widthOfHour; // helper variable to detect how long (in px) an hour is

// Colors
let colorBackground = "#dfdfdf";
let colorRed = "#ff1414";
let colorRedTransparent = "#ff141444";
let colorWhiteTransparent = "#ffffff77";

/**
 * Helper function to resize the canvas, when the window is resized. Can be copied over as is for every sketch
 */
window.addEventListener('resize', function() {
  resizeCanvas(windowWidth, windowHeight);
  widthOfHour = (windowWidth * .8) / 24 // also recalculate the width of the hour
  console.log("resize");
})

// preloading the data before anything is rendered
function preload() {
  loadJSON('data/db.json', function(res) {
    data = res; // assiging the result to the data variable
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1); // since the data is not changing, it is enough to render each second (or even less)
  widthOfHour = (windowWidth * .8) / 24; // calculate the width of an hour
}

function draw() {
  // background
  background(colorBackground);

  // timeline
  stroke("#f01414");
  strokeWeight(20)
  line(windowWidth / 10,
       windowHeight / 2,
       windowWidth * .9,
       windowHeight / 2);

  // inner line
  strokeWeight(2);
  stroke(colorWhiteTransparent);
  line(windowWidth / 10,
    windowHeight / 2,
    windowWidth * .9,
    windowHeight / 2);

  textAlign(RIGHT, CENTER)
  fill("#aaa")
  text("0:00", windowWidth / 10 - 20, windowHeight / 2)

  textAlign(LEFT, CENTER)
  text("12:00", windowWidth * .9 + 20, windowHeight / 2)

  // timestamps
  for ( let item of data ) {
    // dots
    let index = data.indexOf(item); // keep an index to check whether to draw on top or bottom
    let time = new Date(item.dateTime); // get the date of the train arrival

    let startPoint = map(time.getHours(), 0, 12, windowWidth / 10, windowWidth * .9); // get the position based on the hour
    let startOffset = map(time.getMinutes(), 0, 59, 0, widthOfHour); // get the offset to move to the right based on the minutes
    let posX = startPoint + startOffset; // combine into the final position

    fill("#fff")
    stroke(colorRedTransparent)
    strokeWeight(1);
    circle(posX, windowHeight / 2, 12)

    // lines
    let sign = index % 2 == 0 ? -1 : 1; // check if should be positive (draw over the line) or negative (draw bellow the line)
    let lineStartY = windowHeight / 2 + (15 * sign) + (10 * sign); // start of the line
    let lineEndY = windowHeight / 2 + (15 * sign) + (20 * sign) + (10 * index * sign); // end of the line

    stroke(colorRedTransparent);
    strokeWeight(2);

    line(posX,
         lineStartY,
         posX,
         lineEndY)

    // times
    noStroke();
    fill(colorRed);
    textAlign(LEFT, CENTER);
    text(`${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`, posX + 5, lineEndY - 5 * sign); // draw the text for the current time
  }
}