let canvasPadding;
let balloons = [];
let n = 50;
// Perlin noise variables (for wind force)
let noiseX = 100;
let increment = 0.01;

function newBalloon(diameter) {
    let b = {
        // position starts at lower part of canvas
        position: createVector(random(0, width), random(height - 100, height)),
        velocity: createVector(0, 0),
        acceleration: createVector(0, 0),
        helium: createVector(0, -0.02),
        topSpeed: 4,
        diameter: diameter,
        strokeWeight: 1,
        triangleSize: 5,
    };
    b.radius = diameter / 2 - b.strokeWeight;
    return b;
}

function applyForce(b, force) {
    b.acceleration.add(force);
}

function shouldBounce(b) { // baloon hit the ceiling
    return b.position.y - b.diameter / 2 - b.strokeWeight < 0
}

function updateBalloon(b) {
    if (shouldBounce(b)) {
        b.position.y = b.diameter / 2 - b.strokeWeight + 2;
        b.velocity.y *= -0.75;
    }

    applyForce(b, b.helium);
    let windX = map(noise(noiseX), 0, 1, -0.01, 0.01);
    if (mouseIsPressed) {
        applyForce(b, createVector(windX, 0));
    }
    b.velocity.add(b.acceleration);
    b.velocity.limit(b.topSpeed);
    b.position.add(b.velocity);
    //reset the acceleration to 0 every frame
    b.acceleration.mult(0);

    noiseX += increment;

    if (b.position.x > width) b.position.x = 0;
    if (b.position.x < 0) b.position.x = width;
}

function drawBalloon(b) {
    stroke(0);
    strokeWeight(b.strokeWeight);
    fill("pink");

    circle(b.position.x, b.position.y, b.diameter);

    const bottom = b.position.y + b.diameter / 2;

    triangle(
        b.position.x,
        bottom,
        b.position.x + b.triangleSize,
        bottom + b.triangleSize,
        b.position.x - b.triangleSize,
        bottom + b.triangleSize
    );

    line(
        b.position.x,
        bottom + b.triangleSize,
        b.position.x,
        bottom + b.triangleSize * 20
    );
}

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    for(let i = 0; i < n; i++) {
        balloons.push(newBalloon(random(3, 20)));
    }
}

function draw() {
    background(0, 0, 50);

    for(let i = 0; i < n; i++) {
        updateBalloon(balloons[i]);
        drawBalloon(balloons[i]);
    }
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
