let canvasPadding;
let inc = 0.05;
let startY = 0, startX = 0;
let xoff = 0, yoff = 0;
// Scale: ratio of pixels per vector
let scale = 20; // because we don't want one vector per pixel
let rows, cols;
let fr;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    pixelDensity(1);
    // set the grid size. where each square has a vector
    rows = floor(height / scale);
    cols = floor(width / scale);
    fr = createP('');
}

function draw() {
    let yoff = startY;
    for(let row = 0; row < rows; row++) {
        let xoff = startX;
        for(let col = 0; col < cols; col++) {
            let idx = (row * width + col) * 4;
            let r = noise(xoff, yoff) * 255;
            let v = p5.Vector.fromAngle(0);
            xoff += inc;
            fill(r, 100, 100);
            rect(col*scale, row*scale, scale, scale);
        }
        yoff += inc;
    }
    //startY -= inc;
    //startX += inc;
    fr.html(floor(frameRate()));
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

