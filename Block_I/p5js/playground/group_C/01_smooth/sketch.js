let rectWidth = 0; // the width is initialized as an int
let currentTime = ""; // the time is initialized as a string
let bgColor = "#112233"; // the background color is also a string
let time; // define the time variable to store the date into
let timeString = ""; // define the string to use for displaying the time

function setup() {
  createCanvas(windowWidth, windowHeight) // crate the canvas with full width and height
}

function draw() {
  time = new Date(); // define a new Date object to work with

  hourString = String(time.getHours()).padStart(2, "0"); // define the string to use as hours
  minuteString = String(time.getMinutes()).padStart(2, "0"); // define the string to use as minutes
  secondString = String(time.getSeconds()).padStart(2, "0"); // define the string to use as seconds
  timeString = `${hourString}:${minuteString}:${secondString}`; // combine into one string with string interpolation: `${variable}`
  rectWidth = (time.getSeconds() / 60 + time.getMilliseconds() / 60000) * windowWidth; // calculate the with of the rect: width based on seconds + additional width based on milliseconds

  background(bgColor); // set the background color every frame
  noStroke(); // disable stroke
  fill(255, 255, 255, 30); // set the fill
  rect(0, 0, rectWidth, windowHeight); // draw the rect with full height and the predefined width

  fill("white"); // set fill color to white
  textAlign(CENTER, CENTER); // align the text in the middle horizontally and vertically
  textSize(50); // set font size to 50
  text(timeString, windowWidth / 2, windowHeight / 2) // render text on display in the middle
}