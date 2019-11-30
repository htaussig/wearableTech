
const TITLESPACE = 300;
const txtSize = 16;
const textToBoxPadding = 10;
const INTRO = 0;
const EXPLAIN = 1;
const WORDS = 2;
const LOADING = 3;
const RESULTS = 4;
const boxHeight = 40;
const boxWidth = 600;
const dy = 80;

const BUTTONWIDTH = 160;
const BUTTONHEIGHT = 50;

//initial secne
let formMinX = 0;
let formMaxX = 112;
let formMinY = -45;
let formMaxY = 0;
let formDone = false;

//Load Scene
const LOADTHICKNESS = 15;

//Words scene
const TOTALNUMWORDS = 1;
const DELAYBETWEENWORDS = 3; //in seconds

var mid;
var sceneNum;
var isMousePressed;
var hiButton
let readyButton;

let sceneTimer;

let theFont;

let numWords = 2;
let words;
let currentWord;

//for loading page
let circs = [];
let timeOfLastCircleFinish = 0;
let circleNum = 0;
let loadingWords;
let resultsButton;
let doneLoading = false;

//for results page
let easings;


//TODO: preload font

let backCol;

void setup(){
  setup1();
}

void draw(){
  draw1();
}

function setup1(){
  size(800, 800);

  sceneNum = 0;

  sceneTimer = millis();

  //    /4 for now instead of width / 2 so we can see it
  mid = width / 4;

  //easings = new p5.Ease();

  backCol = color('#222831');

  //for the button class
  isMousePressed = false;

  //initialize the hi button
  hiButton = new Button(mid, height * 3 / 5, BUTTONWIDTH, BUTTONHEIGHT, "That's me!");
  readyButton = new Button(mid, height * 3 / 5, BUTTONWIDTH, BUTTONHEIGHT, "I'm ready!");
  resultsButton = new Button(mid, height * 3 / 5, BUTTONWIDTH, BUTTONHEIGHT, "See Results");
  //console.log(hiButton);

  //initLoadingScene();

  words = ["I easily get upset", "I worry whether I made a good impression on somewhat I met",
    "I often rely on other people to keep a conversation going", "I am very affectionate with people I care about",
    "I am still bothered by mistakes a long time ago", "I can stay calm under a lot of pressure",
    "I am dedicated and focused on my goals", "I often cry in front of others",
    "I like discussing different views and theories on what the world could look like in the future",
    "I listen to my heart over my head", "I make decisions on a whim",
    "I can forgive others easily", "I always know exactly what I want", "I usually stick to quiter and less crowded areas",
    "I understand others feelings easily", "My mood can change very quickly",
    "I often talk about my own emotions", "I rarely feel insecure",
    "I like to work in spontaneous bursts of energy rather in organized and consistent efforts",
  ];
}

function draw1(){
  background(backCol);


  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  //textFont(theFont);
  text('Zodiac Predictor', mid, TITLESPACE / 2);
}


//END of DRAW

function Button(x, y, w, h, words) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.col = color('#00adb5');
  this.hovering = false;
  this.clicked = false;
  this.hoveringStarted = 0;
  this.alpha = 255;

  this.display = function () {
    this.col.setAlpha(this.alpha);

    rectMode(CENTER);
    push();
    noFill();

    var diam = this.d;
    if (this.hovering) {
      if (isMousePressed) {
        diam = this.d * 1.2;
      }

      fill(this.col);
      //console.log(mousePressed);
      //appear linearly over 2 seconds
    }

    strokeWeight(4);
    stroke(this.col);
    //ellipse(this.x, this.y, diam, diam);
    rect(this.x, this.y, this.w, this.h);
    this.clicked = false;

    strokeWeight(1);
    textSize(20);
    stroke(255, this.alpha);
    fill(255, this.alpha);
    text(words, this.x, this.y);

    pop();
  }

  this.over = function () {
    //console.log(mouseX, mouseY);
    if (mouseX <= x + w / 2 && mouseX >= x - w / 2 && mouseY <= y + h / 2 && mouseY >= y - h / 2) {
      this.hovering = true;
    }
    else {
      this.hovering = false;
    }
    return this.hovering;
  }

  this.click = function () {
    if (this.over()) {
      this.clicked = true;
      ///nextScene();
    };
  }
}