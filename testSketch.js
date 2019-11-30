let i = 0;

function setup(){
    createCanvas(500, 500);
}

function draw(){
    background(10);

    fill(255, 240, 25);
    ellipse(i++, 60, 60, 60);
}

function mouseClicked(){
    i = 0;
}