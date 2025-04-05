let canvasPadding;
let xoff = 0;
let inc = 0.02;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
}

function draw() {
    background(0, 0, 50);
    stroke(0, 100, 100);
    noFill();
    // here start the shape
    beginShape();
    for(let x = 0; x < width; x++) {
        let y = map(noise(xoff), 0, 1, 0, height);
        //create the vertex
        vertex(x, y);
        xoff += inc;
    }
    endShape();
    noLoop();
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
