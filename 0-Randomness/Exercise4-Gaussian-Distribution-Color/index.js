let canvasPadding;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100, 255);
    background(0, 0, 50);
}

// I want to draw a blue gradient with these colors
/* Hex Code     HSB Notation            Color
    #020024     fill(255, 100, 10)      very dark blue
    #090979     fill(240, 100, 48)      darker blue
    #00d4ff     fill(190, 100, 100)     light blue
*/

function draw() {
    let canvasMid = width / 2;
    let stdev = canvasMid / 2; // standard deviation
    let x = randomGaussian(canvasMid, stdev);
    let h = 0, b = 100; // variables for hue and brightness
    if (x <= canvasMid) {
        h = map(x, 0, canvasMid, 190, 255);
        b = map(x, 0, canvasMid, 100, 10);
    } else {
        h = map(x, canvasMid, width, 255, 190);
        b = map(x, canvasMid, width, 10, 100);
    }
    noStroke();
    fill(h, 100, b, 10);
    circle(x, height / 2, 15);
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
