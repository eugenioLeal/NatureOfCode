let canvasPadding;
let balls = [];
let n = 10;

function newBall(x, y, diameter) {
    let b = {
        position: createVector(x, y),
        velocity: createVector(0, 0),
        acceleration: createVector(0, 0),
        topSpeed: 4,
        diameter: diameter,
        strokeWeight: 1,
        hue: floor(random(0,360)),
    };
    b.radius = diameter / 2 - b.strokeWeight;
    b.mass = b.radius / 8;
    return b;
}

function applyForce(b, force) {
    let f = p5.Vector.div(force, b.mass);
    b.acceleration.add(f);
}

function edges(b) {
    if (b.position.x > width - b.radius) {
      b.position.x = width - b.radius;
      b.velocity.x *= -1;
    } else if (b.position.x < b.radius) {
      b.position.x = b.radius;
      b.velocity.x *= -1;
    }
    if (b.position.y > height - b.radius) {
      b.position.y = height - b.radius;
      b.velocity.y *= -1;
    }
}

function updateBall(b) {
    b.velocity.add(b.acceleration);
    b.velocity.limit(b.topSpeed);
    b.position.add(b.velocity);
    b.acceleration.mult(0);

    // apply the force of gravity
    let gravity = createVector(0, 0.1);
    let g = p5.Vector.mult(gravity, b.mass);
    applyForce(b, g);

    // apply wind when mouse
    let wind = createVector(0.03, 0);
    if (mouseIsPressed) {
        applyForce(b, wind);
    }

    edges(b);
}

function drawBall(b) {
    stroke(0);
    strokeWeight(b.strokeWeight);
    fill(b.hue, 100, 100, 70);
    circle(b.position.x, b.position.y, b.diameter);
}

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    for(let i = 0; i < n; i++) {
        balls.push(newBall(random(10, width-100), 0, (random(9, 80))));
    }
}

function draw() {
    background(0, 0, 50);

    for(let i = 0; i < n; i++) {
        updateBall(balls[i]);
        drawBall(balls[i]);
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
