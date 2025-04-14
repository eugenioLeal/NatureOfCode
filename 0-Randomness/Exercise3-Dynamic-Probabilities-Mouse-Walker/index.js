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
        // give it a 50 percent chance of moving in the direction of the mouse
        let r = random(1); // random float from 0 to 1
        if (r < 0.5) { // 50% chance of moving in the direction of the mouse
            //
            if (mouseX > this.x) { // move right
                this.x++;
            } else { // move left
                this.x--;
            }
            if (mouseY > this.y) { // move down
                this.y++;
            } else { // move up
                this.y--;
            }
        } 
        // The rest of 50% is divided by 4 equal chances (12.5%)
        else if (r < 0.625) { 
            this.y--;
        } else if (r < 0.75) {
            this.y++;
        } else if (r < 0.875) {
            this.x--;
        } else {
            this.x++;
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
