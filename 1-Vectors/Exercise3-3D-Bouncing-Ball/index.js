let canvasPadding;
// Declare position and velocity of the ball
let position, velocity;
let box_x = 200, box_y = 200, box_z = 200;
let boxRoof = Math.floor(box_z / 2), boxFloor = Math.floor(box_z / 2) * -1;
let boxUp = Math.floor(box_x / 2) * -1, boxDown = Math.floor(box_x / 2);
let boxLeft = Math.floor(box_y / 2) * -1, boxRight = Math.floor(box_y / 2);
let radius = 10;
let font;

function preload() {
    font = loadFont('../../assets/Arial.ttf');
}

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    // For 3D, specify WebGL
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding, WEBGL);
    textFont(font);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    // setup position and speed of the ball
    position = createVector(0, 0, 0);
    velocity = createVector(random(-3,3), random(-3,3), random(-3,3));
}

function draw() {
    // move the camera above the box, looking down
    camera(500, 550, 600,   // camera position (x, y, z)
         0, 0, 0,      // look at the origin
         0, 0, -1);    // which way is "up" (in this case, Z is up)
    orbitControl();
    // clear the background each frame
    background(0, 0, 50);

    // Move the ball according to it's velocity
    position.add(velocity);

    // Check for bouncing
    if(position.x - radius < boxLeft | position.x + radius > boxRight) { // ball position moved out of bounds 
        velocity.x *= -1;
    }
    if(position.y - radius < boxUp | position.y + radius > boxDown) {
        velocity.y *= -1;
    }
    if(position.z - radius < boxFloor | position.z + radius > boxRoof) {
        velocity.z *= -1;
    }

    // Draw box
    noFill();
    stroke(0,0,0);
    box(box_x, box_y, box_z);

    // Draw sphere
    normalMaterial();
    //translate(position.x, position.y, position.z);
    push();
    translate(position.x, position.y, position.z);
    //translate(position.x, 0, 0);
    //translate(0, position.y, 0);
    //translate(0, 0, position.z);
    sphere(radius);
    pop();

    //drawAxis();
      // Show FPS
  camera(); // reset to default for 2D text
  resetMatrix(); // ensure text renders properly
  fill(255);
  textSize(16);
  text("FPS: " + nf(frameRate(), 2, 1), -width/2 + 10, -height/2 + 20);
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

function drawAxis() {
  strokeWeight(1.6);
  
  // X axis - red
  stroke(0, 100, 100);
  line(0, 0, 0, 1000, 0, 0);
  
  // Y axis - green
  stroke(100, 100, 100);
  line(0, 0, 0, 0, 1000, 0);
  
  // Z axis - blue
  stroke(200, 100, 100);
  line(0, 0, 0, 0, 0, 1000);
}
