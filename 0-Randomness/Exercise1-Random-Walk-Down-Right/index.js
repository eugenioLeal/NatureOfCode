// make a Random Walker that has a greater tendancy to go down and to the right


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
        let choice = floor(random(6));

        if (choice <= 1) { // Choice is 0 or 1
            this.x++; // greater chance to go to the right
        } else if (choice > 1 && choice <= 3) { // Choice is 2 or 3
            this.y++; // greater chance to go down
        } else if (choice > 3 && choice === 4) { // Choice is 4
            this.y--;
        } else { // Choice is 5
          this.x--;
        }

        /* You can also make increase the chances to go down and up by making the range larger in that direction
            let xstep = random(-2.75, 3);
            let ystep = random(-2.75, 3);
            this.x += xstep;
            this.y += ystep;
        */
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
