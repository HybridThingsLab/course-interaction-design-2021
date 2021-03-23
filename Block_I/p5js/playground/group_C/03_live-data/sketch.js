const API_URL = "https://opensky-network.org/api" // create the base api link
let result = {} // create the object to store the result in
let plane; // create a variable to store the image in

/**
 * Helper function to resize the canvas, when the window is resized. Can be copied over as is for every sketch
 */
window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight)
  console.log("resize")
})

/**
 * Create an interval to run the getData() function periodically
 * https://www.w3schools.com/jsref/met_win_setinterval.asp
 */
document.addEventListener("DOMContentLoaded", function() {
  setInterval(function() {
      getData()
  }, 2500) // run every 2500ms or 2.5s
})

function preload() {
  plane = loadImage('assets/plane.png') // preload the plane image
  getData() // get initial data
}

function setup() {
  createCanvas(windowWidth, windowHeight) // crate the canvas with full width and height
}

function draw() {
  //.draw the background
  background("#112233")

  // draw the lat / long lines
  stroke("rgba(255, 255, 255, .02)")
  for ( let i = 0; i < 18; i++) {
    line(i * windowWidth / 18, 0, i * windowWidth / 18, windowHeight) // draw the longitudes
    line(0, i * windowHeight / 18, windowWidth, i * windowHeight / 18) // draw the latitudes
  }

  for (let state in result.states) { // iterate through the results
    let item = result.states[state] // save item for easier access
    let long = item[5] // get the longitude value
    let lat = item[6] // get the latitude value
    let altitude = item[7] // get the altitude value
    let trueTrack = item[10] // get the heading

    let x = map(long, -180, 180, 0, windowWidth) // map x coordinates to screen
    let y = map(lat, -90, 90, windowHeight, 0) // map y coordinates to screen
    let scale = map(altitude, 0, 11000, 0, 1.5) // map the height of the plane to the scale

    imageMode(CENTER) // draw images from the center
    push() // save current transforms
    translate(x + 5 * scale, y + 5 * scale) // move the center of the canvas to the plane
    rotate(PI / 180 * trueTrack) // rotate around the center of the canvas (now where the plane is)
    translate(- x - 5 * scale, - y - 5 * scale) // translate back to where the center was
    tint(255, map(altitude, 0, 11000, 0, 200)) // map the altitude to the transparency of the plane
    image(plane, x, y, 10 * scale, 10 * scale) // draw the plane
    pop() // return to previous transforms
  }
}

function getData() {
  console.log("Getting data...")
  loadJSON(`${API_URL}/states/all`, function(data) {
    result = data // set the data to the result
  })
}