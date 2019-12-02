var circs = [];

var t = 0; //time

function setup() {
  createCanvas(800, 800);

  circ1 = new Circle(width / 2, height / 2, width / 3);
  circs.push(circ1);

  circ2 = new Circle(width / 2, height / 2, (width / 3) - thickness * 2);
  circs.push(circ2);
  
  circ3 = new Circle(width / 2, height / 2, (width / 3) - thickness * 4);
  circs.push(circ3);
}


function draw() {
  background(0);
  t++;

  for (var i = 0; i < circs.length; i++) {
    var circ1 = circs[i]; 

    if (!circ1.isComplete) {
      circ1.increasePercent(noise(t / 30.0) / 1.4);
      break;
    }
  }

  for (var i = 0; i < circs.length; i++) {
    var circ2 = circs[i]; 

    circ2.display();
  }
}


//probably put everything in one file for the final deal

var thickness = 15;

class Circle {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.percent = 1; //the percent loaded we are
    this.complete = false;
  }

  increasePercent(inc){
    this.percent += inc;
    
    if(this.percent >= 100){
      this.percent = 99.99;
      this.isComplete = true;
    }
  }

  display() {
    noStroke();
    fill(255);
    //console.log(this.x, this.y, this.d);
    //ellipse(this.x, this.y, this.d, this.d);
    arc(this.x, this.y, this.d, this.d, PI / 2, (TWO_PI * this.percent / 100.0) + PI / 2, PIE);
    
    fill(0);
    arc(this.x, this.y, this.d - thickness, this.d - thickness, PI / 2, (TWO_PI * this.percent / 100.0) + PI / 2, PIE);
  }
}
