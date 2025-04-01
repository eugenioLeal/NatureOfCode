let canvasPadding;
let n;

function setup() {
    canvasPadding = floor(windowWidth*0.1) // 10% padding
    createCanvas(windowWidth - canvasPadding, windowHeight - canvasPadding);
    centerCanvas();
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 50);
    // input declaration
    n = 50; // n = total numbers to track
    randomCounts = []
    // initialize array with zeros
    for(let i = 0; i < n; i++) {
        randomCounts.push(0);
    }
}

function draw() {
    // Pick a random number on range: [0,9]
    let randomNum = floor(random(n));
    // Increase the count
    randomCounts[randomNum]++;
    // Set the width of every rectangle drawn 
    let w = width / n;
    for(let i = 0; i < n; i++) {
        let hueV = map(i, 0, n, 0, 360); // spreads the hue across the array size
        let col = color(hueV, 100, 100); // full saturation and brightness
        fill(col);
        rect(i * w, height - randomCounts[i], w, randomCounts[i]);
    }
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
