// webcam capture
let capture;
let camWidth = 640;
let camHeight = 480;
let toggle = 0;

function setup() {

  // init canvas
  canvas = createCanvas(camWidth, camHeight).parent('canvas');

  // init webcam
  let constraints = {
    video: {
      mandatory: {
        maxWidth: camWidth,
        maxHeight: camWidth
      },
      optional: [{
        maxFrameRate: 30
      }]
    },
    audio: false
  };
  capture = createCapture(constraints, function (stream) {
    console.log("capture webcam started");
  });
  capture.hide();
}

function draw() {

  // background
  background(0);

  // load pixels (need to get color of pixel)
  capture.loadPixels();

  // check state toogle
  if (toggle == 1) {

    // show webcam
    image(capture, 0, 0);
    // show vertical line
    noFill();
    stroke(0, 0, 255);
    strokeWeight(1);
    line(width / 2, 0, width / 2, height);

  } else {

    // loop through pixels vertical line center of image (or later movie)
    for (let i = 0; i <= height; i++) {

      // get color
      let c = getColor(capture, width / 2, i);

      noFill();
      stroke(c);
      strokeWeight(1);
      line(0, i, width, i);

    }

  }


  // update pixels
  capture.updatePixels();

  // show FPS(for debugging)
  fill(255);
  noStroke();
  rect(0, 0, 170, 40);
  fill(0);
  text("FPS " + int(frameRate()), 8, 12)
  // show hint
  text("press any key to toggle view ", 8, 32);
}

// keyboard interaction (just for debugging)
function keyReleased() {
  if (toggle == 0) {
    toggle = 1;
  } else {
    toggle = 0;
  }
}

// custom functions
function getColor(img, x, y) {
  var i = (y * img.width + x) * 4;
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3]
  ];
}