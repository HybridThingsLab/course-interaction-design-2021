// webcam capture
let capture;
let camWidth = 640;
let camHeight = 480;

// how many samples
let sampleN = 100;

// frame buffer
let frames = [];
let framesColor = [];

let gridWidth = 12; 
let gridHeight = 20; // -> 240
let intervalCapture = 250; // each 250ms = 250 x 240 = 60000
let frameWidth = 67;
let frameHeight = 40;



let frameBuffer;


function setup() {

  // init canvas
  canvas = createCanvas(800,800).parent('canvas');

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

  // init frames buffer
  let numberFrames = gridWidth * gridHeight;
  for (let i = 0; i < numberFrames; i++) {
    let img = createImage(camWidth, camHeight);
    frames.push(img);
    framesColor.push(color(0));
  }

  // set interval frame buffer
  setInterval(function () {
    updateFrameBuffer();
  }, intervalCapture);

  noStroke();

}

function draw() {

  // background
  background(0);

  // show webcam
  // image(capture, 0, 0, width, height);

  // show frames of buffer as grid
  let posX = 0;
  let posY = 0;

  for (let i = frames.length - 1; i >= 0; i--) {
  
    fill(framesColor[i]);
    //rect(posX, posY, frameWidth, frameHeight);

    // show frame
    image(frames[i], posX, posY, frameWidth, frameHeight);
    stroke(255);
    rect(posX + 5, posY + 5,20,20);

    // counter position x
    posX += frameWidth;
    // if at end of row next row
    if (posX >= width) {
      posX = 0;
      posY += frameHeight;
    }
  }

/*
  // show FPS(for debugging)
  fill(255);
  noStroke();
  rect(0, 0, 64, 16);
  fill(0);
  text("FPS " + int(frameRate()), 8, 12)
*/

}

// update frame buffer
function updateFrameBuffer() {

  // get current frame
  frames[0].copy(capture, 0, 0, camWidth, camHeight, 0, 0, camWidth, camHeight);

  // https://editor.p5js.org/gfm262/sketches/ySFjnviSx
  totalR= 0;totalG = 0;totalB = 0;
  for(let i = 0; i < sampleN; i++){
    x = random(frames[0].width);
    y = random(frames[0].height);
    c = frames[0].get(x,y);
    totalR += c[0];
    totalG += c[1];
    totalB += c[2];
  }
  
  // shift through frames
  frames[frames.length - 1] = frames[0];
  framesColor[framesColor.length - 1] = color(totalR/sampleN,
                                              totalG/sampleN,
                                              totalB/sampleN);
  for (let i = 1; i < frames.length; i++) {
    frames[i - 1] = frames[i];
    framesColor[i - 1] = framesColor[i];
  }

}