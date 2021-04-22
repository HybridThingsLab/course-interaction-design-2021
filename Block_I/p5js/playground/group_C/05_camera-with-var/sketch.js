let capture; // create object to hold capture
let images = []; // create array for all the images
let imgWidth, imgHeight; // create object ot hold the image width and height
let initialSecond; // create variable to hold the initial second / array index

/**
 * Our canvas resize function
 */
 function resize() {
  resizeCanvas(windowWidth, windowHeight);
  imgWidth = windowWidth / 6;
  imgHeight = windowHeight / 10;
  capture.size(imgWidth, imgHeight);
}

function setup() {
  window.addEventListener('resize', resize); // add the listener for our resize function

  createCanvas(windowWidth, windowHeight);
  frameRate(4); // since we are updating once a second we don't need 60fps
  colorMode(RGB, 255); // set color mode to RGB
  noStroke(); // don't stroke the forms
  fill(127, 255, 0); // set the fill for the indicator

  // calculate image sizes
  imgWidth = windowWidth / 6;
  imgHeight = windowHeight / 10;

  capture = createCapture(VIDEO); // create new capture stream (check browser settings to allow camera)
  capture.size(imgWidth, imgHeight); // set capture size to out image size
  capture.hide(); // hide the capture output

  initialSecond = 0; // we are starting from array position 0

  setInterval(captureImage, 1000); // capture an image every second
}

/**
 * Captures an image every second
 */
function captureImage() {
  images[initialSecond] = capture.get(0, 0, imgWidth, imgHeight); // capture an image and put it into the array
  initialSecond = initialSecond == 59 ? 0 : initialSecond + 1; // increase the second by one, or set to 0 if already at 59
}

function draw() {
  background(0)

  // helper variables for rows
  let row = 0;
  let col = 0;

  // iterate through all the images
  for (let img of images) {
    if(!!img) { // if there is an image
      img.loadPixels(); // get all the pixels from the image (initialize the img.pixels array)
      let pixels = img.pixels; // save the pixels into a variable

      let index = pixels.length / 2; // get the middle most pixel position

      let bVal = brightness(color(pixels[index], pixels[index+1], pixels[index+2])); // get the brightness value of this pixel

      rHeight = map(bVal, 0, 100, 0, imgHeight); // calculate the height the indicator should be
      rY = map(bVal, 0, 100, imgHeight * (row + 1), imgHeight * row); // calculate the y value of the indicator

      image(img, imgWidth * col, imgHeight * row, imgWidth, imgHeight) // draw it on the canvas in col / row
      rect(imgWidth * col, rY, 20, rHeight); // draw the indicator
    }

    col += 1; // increase column by 1
    if (col > 5) { // if it is already at column 6 (index 5)
      col = 0 // set column back to one
      row += 1 // and increase the row instead
    }
  }
}