console.log('Hello from index.js');

let walker; // global variable
let canvasPadding;
let nFrames = 0;
let nRainbow = 0;
let color;

class Walker {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
    }

    place(x, y) {
        this.x = x;
        this.y = y;
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
        point(this.x, this.y);
    }

    step() {
        let step = 3;
        let moveX = step * accept_reject();
        if (random([true, false])) {
            moveX *= -1;
        }
        let moveY = step * accept_reject();
        if (random([true, false])) {
            moveY *= -1;
        }

        this.x += moveX;
        this.y += moveY;
    }
}

function accept_reject() {
    while(true) {
        let r1 = random(1);
        let p = (3*r1)**2 + 2*r1 + 5;
        let r2 = random(1);
        if (r2 < p) {
            return r1;
        }
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
