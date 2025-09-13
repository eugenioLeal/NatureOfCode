let canvasPadding;
// Declare position and velocity of the ball
let position, velocity;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    // setup position and speed of the ball
    position = createVector(random(0, width), random(0, height));
    velocity = createVector(3, 3);
}

function draw() {
    // clear the background each frame
    background(0, 0, 50);

    // Move the ball according to it's velocity
    position.add(velocity);

    // Check for bouncing
    if(position.x < 0 || position.x > width) { // ball position moved out of bounds 
        velocity.x *= -1;
    }
    if(position.y < 0 | position.y > height) {
        velocity.y *= -1;
    }

    // Draw the ball at position (x,y)
    fill(0, 100, 100);
    ellipse(position.x, position.y, 20, 20);
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
