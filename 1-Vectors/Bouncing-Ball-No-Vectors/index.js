let canvasPadding;
// Declare position and speed of the ball
let x, y, xSpeed, ySpeed;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    // setup position and speed of the ball
    x = random(0, width);
    y = random(0, height);
    xSpeed = 3;
    ySpeed = 3;
}

function draw() {
    // clear the background each frame
    background(0, 0, 50);

    // Move the ball according to it's speed
    x += xSpeed;
    y += ySpeed;

    // Check for bouncing
    if(x < 0 || x > width) { // ball position moved out of bounds 

        xSpeed *= -1;
    }
    if(y < 0 || y > height) {
        ySpeed *= -1;
    }

    // Draw the ball at position (x,y)
    fill(0, 100, 100);
    ellipse(x, y, 20, 20);
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
