let walker; // global variable
let canvasPadding;
let nFrames = 0;
let nRainbow = 0;
let color;

class Walker {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
    }

    show() {
        if (++nRainbow % 361 === 0) {
            nRainbow = 0;
        }
        if (++nFrames % 2 === 0) { // change color every x frames
            color = nRainbow; nFrames = 0;
        }

        stroke(color, 100, 100);
        strokeWeight(10);
        point(this.position.x, this.position.y);
    }

    step() {
        let moveX = randomGaussian(0, 5);
        let moveY = randomGaussian(0, 5);

        this.position.add(moveX, moveY);
    }
}

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100);
    walker = new Walker();
    background(0, 0, 50);
    color = random(0, 360);
}

function draw() {
    walker.show();
    walker.step();
}

function windowResized() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    resizeCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    walker = new Walker();
    background(0, 0, 50);
}

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;

    select('.p5Canvas').style('position', 'absolute').style('left', `${x}px`).style('top', `${y}px`);
}
