let balls = [];
let goal;

class Ball {
  constructor(posX, posY, r, year) {
    this.posX = posX;
    this.posY = posY;
    this.r = r;
    this.year = year
    this.dragging = false;
  }
}

class Goal {
  constructor(posX, posY, w, h, hit) {
    this.posX = posX;
    this.posY = posY;
    this.w = w;
    this.h = h;
    this.hit = hit;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  goal = new Goal(200, 100, windowWidth - 400, windowHeight - 400, false);
  balls.push(new Ball(0, 0, 50, 1954));
  balls.push(new Ball(0, 0, 50, 1974));
  balls.push(new Ball(0, 0, 50, 1990));
  balls.push(new Ball(0, 0, 50, 2014));


  for(let ix in balls) {
    let ball = balls[ix];
    ball.posX = 200 + (windowWidth - 200) / balls.length * ix;
    ball.posY = windowHeight - 200;
  }
}

function draw() {
  background("#fff");

  if(goal.hit) {
    fill("#3345ef");
  } else {
    fill("green");
  }

  rect(goal.posX, goal.posY, goal.w, goal.h);

  for( let i = 0; i < balls.length; i++) {
    fill("#123");
    noStroke();
    let ball = balls[i];

    if ( ball.dragging ) {
      ball.posX = mouseX;
      ball.posY = mouseY;
    }
    ellipse(ball.posX, ball.posY, ball.r);
  }
}

function mousePressed() {
  console.log("pressed")
  for( let i = 0; i < balls.length; i++) {
    if (dist(mouseX, mouseY, balls[i].posX, balls[i].posY) < 25) {
      console.log(dist(mouseX, mouseY, balls[i].posX, balls[i].posY) < 25)
      balls[i].dragging = true;
    }
  }
  console.log(balls);
}

function mouseReleased(e) {
  console.log("released");
  balls.map(b => {
    b.dragging = false;
    return b;
  })

  for (let ix in balls) {
    ball = balls[ix];
    if ( ball.posX > goal.posX && ball.posX < goal.posX + goal.w) {
      if ( ball.posY > goal.posY && ball.posY < goal.posY + goal.h) {
        goal.hit = true;
        break
      } else {
        goal.hit = false;
      }
      goal.hit = false;
    }
  }
}