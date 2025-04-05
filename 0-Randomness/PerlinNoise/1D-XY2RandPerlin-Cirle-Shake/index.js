let canvasPadding;
let xoff = 0;
let xoff2 = 100;
let inc = 0.02;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 50);
}

function draw() {
    background(0, 0, 50);
    let x = map(noise(xoff), 0, 1, 0, width);
    let y = map(noise(xoff2), 0, 1, 0, height);
    fill(0, 100, 100);
    xoff += inc;
    xoff2 += inc;
    ellipse(x, y, width * 0.01, width * 0.01);
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
