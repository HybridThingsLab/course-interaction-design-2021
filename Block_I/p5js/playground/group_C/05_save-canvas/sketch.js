let canvas; // create variable to store canvas

/**
 * our resize function
 */
function resize() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  window.addEventListener('resize', resize);
  document.addEventListener('keydown', keyPressed); // register with the keydown event

  canvas = createCanvas(windowWidth, windowHeight); // create and save canvas to variable
  background('#ddd');
  noStroke();
}

function draw() {
  // create a dot with a random position, size and opacity
  let dot = {
    x: Math.floor(windowWidth * Math.random()),
    y: Math.floor(windowHeight * Math.random()),
    scale: Math.floor(30 * Math.random()),
    opacity: Math.floor(255 * Math.random())
  }

  // draw the dot
  fill(80, 100, 150, dot.opacity);
  circle(dot.x, dot.y, dot.scale);
}

/**
 * Function is called when any key is pressed
 */
function keyPressed(e) {
  e.stopPropagation(); // don't propagate to the window object, otherwise the keydown event is triggered twice
  switch (e.key) {
    case('s'): // if key is 's'
      saveCanvas(canvas, 'screenshot', 'jpg'); // take screenshot
    default: // otherwise
      console.log(e.key) // log the pressed key
    /*
    more cases:

    case('a'):
      .....
    */
  }
}