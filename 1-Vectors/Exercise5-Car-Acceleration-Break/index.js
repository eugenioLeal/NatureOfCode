let canvasPadding;
// Declare position and velocity of the ball
let position, velocity;

class Vehicle {
    constructor() {
        this.position = createVector(0, height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    }
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    }
    show() {
        fill(0, 100, 100);
        rect(this.position.x, this.position.y, 30, 20);
    }
    checkEdges() {
        if (this.position.x > width) {
          this.position.x = 0;
        } else if (this.position.x < 0) {
          this.position.x = width;
        }

        if (this.position.y > height) {
          this.position.y = 0;
        } else if (this.position.y < 0) {
          this.position.y = height;
        }
    }
}

let car;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    car = new Vehicle();
    // setup position and speed of the ball
    position = createVector(random(0, width), random(0, height));
    velocity = createVector(3, 3);

}

function draw() {
    // clear the background each frame
    background(0, 0, 50);

    if (keyIsDown(UP_ARROW)) {
        car.acceleration.x += 0.001;
    }

    if (keyIsDown(DOWN_ARROW)) {
        car.acceleration.x -= 0.001;
    }

    car.show();
    car.update();
    car.checkEdges();
}

function windowResized() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    resizeCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    background(0, 0, 50);
}

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    select('.p5Canvas').style('position', 'absolute').style('left', `${x}px`).style('top', `${y}px`);
}

