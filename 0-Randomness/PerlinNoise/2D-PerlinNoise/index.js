let canvasPadding;
let inc = 0.02;
let startY = 0, startX = 0;
let xoff = 0, yoff = 0;
//let up = false, down = false, left = false, right = false;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
    pixelDensity(1);
}

function up() {
    //up = true;
    //down = false;
    startY -= inc;
}
function down() {
    startY += inc;
}
function left() {
    startX -= inc;
}
function right() {
    startX += inc;
}

function draw() {
    loadPixels();
    let yoff = startY;
    for(let row = 0; row < height; row++) {
        let xoff = startX;
        for(let col = 0; col < width; col++) {
            let idx = (row * width + col) * 4;
            let r = noise(xoff, yoff) * 255;
            pixels[idx+0] = r;
            pixels[idx+1] = r;
            pixels[idx+2] = r;
            pixels[idx+3] = 255;
            xoff += inc;
        }
        yoff += inc;
    }
    updatePixels();
    //startY -= inc;
    //startX += inc;
    // you can modify the number of wave combinations (octaves) and by what factor does the change in amplitude and frequency
    // in octave generation (falloff amount).
    // This is done by the noiseDetail(octaves, falloff_amount) function
    // reference: https://p5js.org/reference/p5/noiseDetail/
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

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            console.log('Up arrow pressed');
            up();
            break;
        case 'ArrowDown':
            down();
            console.log('Down arrow pressed');
            break;
        case 'ArrowLeft':
            console.log('Left arrow pressed');
            left();
            break;
        case 'ArrowRight':
            console.log('Right arrow pressed');
            right();
            break;
    }
});
