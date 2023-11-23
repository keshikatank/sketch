let circles = [];
let buttonX, buttonY;
let gameState = 'playing';
let startTime;
let pintu

function preload(){
pintu = loadImage('pintu.png')
  shop = loadImage('bg.jpg')
  kid = loadImage('kid4.png')
}
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {
    circles.push(new Circle());
  }
  randomizeButtonPosition();
  startTime = millis();
}

function draw() {
  background(0);
 
  image(shop,0,0,400,400)
   image(pintu,60,10,300,390)
  textSize(50)
  textFont('Times New Roman')
fill(0)
text('GET TO PINTU',30,130)

  if (gameState === 'playing') {
    if (millis() - startTime > 35000) {
      gameState = 'gameOver';
    }

    if (millis() % 700 < 30) { // Change button position every second
      randomizeButtonPosition();
    }

    for (let circle of circles) {
      circle.display();
    }

    fill(255, 0, 0); // Red
    ellipse(buttonX, buttonY, 40, 40);
    
    if (circles.length === 0) {
      gameState = 'youWon';
    }
  } else if (gameState === 'gameOver') {
    background(0);
    textSize(32);
    fill(0,255,0);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  } else if (gameState === 'youWon') {
    background(0);
    textSize(32);
    fill(0, 255, 0); // Green
    textAlign(CENTER, CENTER);
    text("You Won!", width / 2, height / 2);
  }
}

function randomizeButtonPosition() {
  buttonX = random(width - 40);
  buttonY = random(height - 40);
}

function mouseClicked() {
  if (gameState === 'playing') {
    let distance = dist(mouseX, mouseY, buttonX, buttonY);
    if (distance < 20) {
      let closestCircle = null;
      let closestDist = Infinity;

      for (let circle of circles) {
        let circleDistance = dist(mouseX, mouseY, circle.x, circle.y);
        if (circleDistance < closestDist) {
          closestDist = circleDistance;
          closestCircle = circle;
        }
      }

      if (closestCircle) {
        circles.splice(circles.indexOf(closestCircle), 1);
      }
    }
  }
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(200,340);
    this.radius = 70;
  }

  display() {
    image(kid, this.x - this.radius, this.y - this.radius,this.radius*2, this.radius*2);
  }
}
