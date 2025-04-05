let canvasPadding;
let inc = 0.02;
let start = 0; // tracks where xoff started at
let hue = 0;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
}

function draw() {
    let xoff = start;
    background(0, 0, 50);
    stroke(hue, 100, 100);
    if (++hue === 361) { hue = 0; }
    noFill();
    // here start the shape. draws the line/shape through the whole width of the screen
    beginShape();
    for(let x = 0; x < width; x++) {
        let y = map(noise(xoff), 0, 1, 0, height);
        //create the vertex
        vertex(x, y);
        xoff += inc;
    }
    endShape();
    // For the next frame, shift the whole sampling window slightly foreward
    start += inc; // this line creates the scrolling effect animation
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
