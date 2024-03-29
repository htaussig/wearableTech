
const TITLESPACE = 100;
const txtSize = 16;
const textToBoxPadding = 10;
const INTRO = 0;
const EXPLAIN = 1;
const COUNTDOWN = 2;
const WORDS = 3;
const LOADING = 4;
const RESULTS = 5;
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

//countdown scene
let ready = 0;

//Words scene
const TOTALNUMWORDS = 8; //8 - 10
const DELAYBETWEENWORDS = 4.75; //5?
const NOWORDTIME = .5;

var mid;
var sceneNum;
var isMousePressed;
var hiButton
let readyButton;

let sceneTimer;

let theFont;

let numWords = 0;
let words;
let currentWord;

//for loading page
let circs = [];
let timeOfLastCircleFinish = 0;
let circleNum = 0;
let loadingWords;
let resultsButton;
let doneLoading = false;

const LOADINGSPEED = 1.6; //1.6

//for results page
let easings;

let backCol;

let doneButton;
let beginButton;

function preload() {
  //theFont = loadFont('assets/nidus.ttf');
  //theFont = loadFont('assets/nidus.ttf');
  theFont = loadFont('assets/NeogreyMedium.otf');
  //fontRegular = loadFont('BigCaslon.otf');
  //fontItalic = loadFont('assets/Italic.ttf');
  //fontBold = loadFont('assets/Bold.ttf');
}

function setup() {
  createCanvas(getWidth(), getHeight());

  sceneNum = 0;

  sceneTimer = millis();

  //    /4 for now instead of width / 2 so we can see it
  mid = width / 2;

  easings = new p5.Ease();

  backCol = color('#222831');

  //for the button class
  isMousePressed = false;

  //initialize the hi button
  hiButton = new Button(mid, height * 4 / 5, BUTTONWIDTH, BUTTONHEIGHT, "Let's go!", true);
  readyButton = new Button(mid, (height * 4 / 5), BUTTONWIDTH, BUTTONHEIGHT, "Continue", true);
  resultsButton = new Button(mid, (height * 1 / 2) + 6, BUTTONWIDTH, BUTTONHEIGHT, "See Results", true);

  doneButton = new Button(mid, height * 3 / 5, BUTTONWIDTH, BUTTONHEIGHT, "Next", false);
  beginButton = new Button(mid, height * 3 / 5, BUTTONWIDTH, BUTTONHEIGHT, "Begin", false);
  //console.log(hiButton);

  initLoadingScene();

  words = ["I easily get upset", "I worry whether I made a good impression on somewhat I met",
    "I often rely on other people\nto keep a conversation going", "I am very affectionate with people I care about",
    "I am still bothered by mistakes I made a long time ago", "I can stay calm under a lot of pressure",
    "I am dedicated and focused on my goals", "I often cry in front of others",
    "I like discussing different views and theories\non what the world could look like in the future",
    "I listen to my heart over my head", "I make decisions on a whim",
    "I can forgive others easily", "I always know exactly what I want", "I usually stick to quieter and less crowded areas",
    "I understand others' feelings easily", "My mood can change very quickly",
    "I often talk about my own emotions", "I rarely feel insecure",
    "I like to work in spontaneous bursts of energy\nrather than organized and consistent efforts",
  ];

  words = shuffle(words);
  currentWord = words.pop();
}

//$(window).height();
//$(window).width();

function draw() {
  background(backCol);

  //console.log(sceneNum);

  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  textFont(theFont);
  text('Zodiac Predictor', mid, 20);

  //console.log(getTimePassed());
  //intro scene:
  // Hi, are you?
  //Press yes button
  if (sceneNum == INTRO) {
    //textFont(fontItalic);
    //text('scene: ' + sceneNum, 90, 20);

    //console.log(getTimePassed());
    if (formDone) {
      hiButton.over();
      hiButton.display();
    }
    else {
      //text('scene: ' + sceneNum, 90, 20);
      push();
      textSize(32);
      text("Use me to predict your Zodiac Sign!", mid, TITLESPACE + 30);

      textSize(16);
      text("A button will appear here after you fill out the Google form!", mid, TITLESPACE + 80);
      pop();
    }
    //hiButton.display();

  }

  if (sceneNum == EXPLAIN) {
    push();
    textAlign(CENTER, CENTER);
    textFont(theFont, 20);

    const textLines = [];
    textLines.push("The Zodiac Predictor will try to determine your\nZodiac Sign using the Azure machine learning algorithm");
    textLines.push("The algorithm will display a new phrase\nevery 4 seconds and ask you to repeat it");
    textLines.push("The circuit playground will measure your Galvanic Skin Response (skin conductivity,\na measure of emotional arousal) while you see and say each phrase");
    textLines.push("It will also take note of the volume and tone of your voice, but currently won't\ntake it into account too much because of the circuit playground’s poor mic quality");
    //textLines.push("");
    textLines.push("The algorithm has been trained on tens of thousands of participants,\nand predicts correctly around 30 percent of the time");
    textLines.push();
    textLines.push();
    textLines.push();
    textLines.push();
    textLines.push();

    var theY = TITLESPACE + 20;
    var dy1 = 35;
    textLines.forEach(theText => {
      text(theText, mid, theY);
      theY += dy1 * 2;
    });

    //console.log(getTimePassed());

    //after five seconds
    const timePassed = getTimePassed();
    const timeToWaitFor = 3;
    if (timePassed > timeToWaitFor) {
      var theAlpha = ((timePassed - timeToWaitFor) / 2) * 255;
      theAlpha = min(theAlpha, 255);
      readyButton.alpha = theAlpha;

      readyButton.over();
      readyButton.display();
    }
    pop();
  }

  if (sceneNum == COUNTDOWN) {

    textSize(20);

    if (ready == 0) {
      push();
      textAlign(CENTER, TOP);
      var str = "The Azure Algorithm will try to determine your perosnality type based on your level\nof emotional arousal when reading these phrases. Then it will try to\npredict your Zodiac Sign based on these traits.";
      text(str, mid, TITLESPACE);

      textSize(10)
      text("Azure uses personality determining phrases from 16Peronalities.com", mid, height * (4 / 5));
      //console.log(doneButton.clicked);

      if (doneButton.clicked) {
        ready++;
        doneButton.clicked = false;
        resetSceneTimer();
      }

      const timePassed = getTimePassed();
      const timeToWaitFor = 3;
      if (timePassed > timeToWaitFor) {
        var theAlpha = ((timePassed - timeToWaitFor) / 2) * 255;
        theAlpha = min(theAlpha, 255);
        doneButton.alpha = theAlpha;

        doneButton.over();
        doneButton.display();
      }
      pop();
    }
    else if (ready == 1) {
      push();
      textAlign(CENTER, TOP);
      var str = "Please attach the GSR sensor to either pointer finger with the velcro straps.\nIt will be used to measure your galvanic skin response\n(essentially the amount of sweat on your hands)";
      text(str, mid, TITLESPACE);

      //console.log(doneButton.clicked);

      if (doneButton.clicked) {
        ready++;
        resetSceneTimer();
      }

      const timePassed = getTimePassed();
      const timeToWaitFor = 3;
      if (timePassed > timeToWaitFor) {
        var theAlpha = ((timePassed - timeToWaitFor) / 2) * 255;
        theAlpha = min(theAlpha, 255);
        doneButton.alpha = theAlpha;

        doneButton.over();
        doneButton.display();
      }
      pop();
    }
    else if (ready == 2) {
      push();
      textAlign(CENTER, TOP);

      var str = "The screen will display a new phrase every 4 seconds.\n You can either say it out loud or only read it, but Azure will\nhave more data to guess your Zodiac if you say the phrases out loud\n\nThere will be 8-10 phrases for you to say\nThen, the Azure algorithm will try to determine your Zodiac Sign";
      text(str, mid, TITLESPACE);
      if (beginButton.clicked) {
        ready++;
        resetSceneTimer();
      }

      const timePassed = getTimePassed();
      const timeToWaitFor = 2;
      if (timePassed > timeToWaitFor) {
        var theAlpha = ((timePassed - timeToWaitFor) / 2) * 255;
        theAlpha = min(theAlpha, 255);
        beginButton.alpha = theAlpha;

        beginButton.over();
        beginButton.display();
      }
      pop();
    }
    else {
      var time = Math.floor(getTimePassed());
      time = 3 - time;

      if (time > 0) {
        text(time, mid, height / 2);
      }
      else if (getTimePassed() > 3.5) {
        nextScene();
      }
    }
  }

  if (sceneNum == WORDS) {

    //word ideas taken from 16personalities.com
    //generate words

    strokeWeight(1);
    stroke(255);
    fill(255);
    textAlign(CENTER, CENTER);

    //console.log(numWords);
    if (numWords < TOTALNUMWORDS) {
      var time = Math.floor(getTimePassed());

      if (time < DELAYBETWEENWORDS) {
        textSize(20);
        text(currentWord, mid, height / 2);
      }

      //console.log(time);
      if (time >= DELAYBETWEENWORDS + NOWORDTIME) {
        numWords++;
        currentWord = words.pop();
        sceneTimer = millis();
      }


    }
    else {
      timeOfLastCircleFinish = getTimePassed();
      currentWord = loadingWords.pop();
      listMajors();
      nextScene();
    }
  }








  if (sceneNum == LOADING) {
    //text('Loading scene', 200, 100);

    //console.log("loading");
    //console.log(resultsButton);

    if (!doneLoading) {
      for (var i = 0; i < circs.length; i++) {
        var circ1 = circs[i];

        //wait for .5 seconds
        let timePassed = getTimePassed();
        let thisTime = timePassed - timeOfLastCircleFinish;
        //console.log(thisTime);
        if (thisTime > .35) {
          if (!circ1.isComplete) {

            circ1.increasePercent(noise(timePassed) / LOADINGSPEED); //1.6
            break;
          }
          else if (i == circleNum) {
            if (circleNum == circs.length - 1) {
              doneLoading = true;
              timeOfLastCircleFinish = getTimePassed();
              resetSceneTimer();
              currentWord = "";
            }
            else {
              timeOfLastCircleFinish = getTimePassed();
              currentWord = loadingWords.pop();
              circleNum++;
            }
          }
        }

      }
    }

    for (var i = 0; i < circs.length; i++) {
      var circ2 = circs[i];

      circ2.display();
    }

    stroke(255);
    fill(255);
    strokeWeight(1);
    textSize(16);
    text(currentWord, mid, height / 2);

    if (doneLoading) {
      let timePassed = getTimePassed();

      //display the button because we are done loading
      //fade in  for a few seconds
      //var fadeInTime = 3; //seconds to fade in
      var theAlpha = ((timePassed) / 2) * 255;
      theAlpha = min(theAlpha, 255);
      resultsButton.alpha = theAlpha;

      resultsButton.over();
      resultsButton.display();
    }
  }



  if (sceneNum == RESULTS) {
    translate(0, TITLESPACE);
    var theCol;
    var theAlpha;
    var FADEINTIME = 2;//how many seconds to fade in for
    var LOADUPTIME = 4;

    textSize(16);
    push();
    translate(mid, 0);
    textAlign(CENTER, CENTER);
    noStroke();
    text("Azure's top 3 guesses:\n(the percentages represent Azure's confidence in it's prediction)", 0, 0);

    textSize(20)
    text("Reload the page to have the Zodiac Predictor\nguess your Zodiac Sign!", 0, height * (3.5 / 5));
    pop();


    let timePassed = getTimePassed();

    if (timePassed < FADEINTIME) {
      theAlpha = (timePassed / 3) * 255;
      theAlpha = min(theAlpha, 255);
      //theAlpha = 255;
    }
    else {
      theAlpha = 255;
    }

    push();
    for (var i = 0; i < zodiacs.length; i++) {

      //console.log(percentages[i]);
      const zodiac = zodiacs[i];
      var percentage = percentages[i];

      if (timePassed > FADEINTIME) {
        var t1 = timePassed - FADEINTIME;

        if (t1 < LOADUPTIME) {
          let easings = new p5.Ease();
          var multiplier = easings.quadraticInOut(t1 / LOADUPTIME);
          percentage *= multiplier;
        }
      }
      else {
        percentage = 0;
      }

      //textFont("Times", 40);
      textSize(txtSize);
      textAlign(LEFT, CENTER);

      strokeWeight(1);
      stroke(0, theAlpha);

      rectMode(CORNER);
      push();

      const x = mid - boxWidth / 2;
      const y = i * dy + 60
      translate(x, y);

      theCol = color('#eeeeee');
      theCol.setAlpha(theAlpha);
      fill(theCol);
      text(zodiac, 0, 0);

      noStroke();

      //translate(0, -txtSize / 2);
      translate(0, textToBoxPadding);
      rect(0, 0, boxWidth, boxHeight);

      //the loading bar part now

      const loadingBoxWidth = (percentage / 100) * boxWidth;

      theCol = color('#00adb5');
      theCol.setAlpha(theAlpha);
      fill(theCol);
      rect(0, 0, loadingBoxWidth, boxHeight);

      //put the percentage on the box
      textAlign(CENTER, CENTER);

      backCol.setAlpha(theAlpha);
      fill(backCol);
      const truncated = Math.floor(percentage * 100) / 100; //the percentage truncated to 2 decimal points
      text(truncated + "%", loadingBoxWidth / 2, boxHeight / 2);
      pop();

    }
    pop();
  }
}

//is this an extra bracket?


//so we can use variables from index.html
//print(zodSigns);

function initLoadingScene() {
  circ1 = new Circle(mid, height / 2, (width / 3) * 1.2);
  circs.push(circ1);

  circ2 = new Circle(mid, height / 2, (((width / 3) * 1.2) - LOADTHICKNESS * 2));
  circs.push(circ2);

  circ3 = new Circle(mid, height / 2, ((width / 3) * 1.2) - LOADTHICKNESS * 4);
  circs.push(circ3);

  loadingWords = [];
  loadingWords.push('Matching to the common\ntraits of Zodiacs');
  loadingWords.push('Azure Algorithm analyzing for\nprobable personality traits');
  loadingWords.push('Cleaning and analyzing data');
}


//Circle Class

class Circle {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.percent = 1; //the percent loaded we are
    this.complete = false;
  }

  increasePercent(inc) {
    this.percent += inc;

    if (this.percent >= 100) {
      this.percent = 99.9999999999;
      this.isComplete = true;
    }
  }

  display() {
    noStroke();
    fill(255);
    //console.log(this.x, this.y, this.d);
    //ellipse(this.x, this.y, this.d, this.d);
    arc(this.x, this.y, this.d, this.d, PI / 2, (TWO_PI * this.percent / 100.0) + PI / 2, PIE);

    fill(backCol);
    stroke(backCol);
    strokeWeight(1);
    arc(this.x, this.y, this.d - LOADTHICKNESS, this.d - LOADTHICKNESS, PI / 2, (TWO_PI * this.percent / 100.0) + PI / 2, PIE);
  }
}


class Button {
  ///Button Constructor
  constructor(x, y, w, h, words, isNextSceneButton) {
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

      textAlign(CENTER, CENTER);

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
      //this.clicked = false;

      strokeWeight(1);
      textSize(20);
      stroke(255, this.alpha);
      fill(255, this.alpha);
      text(words, this.x, this.y);

      pop();
    }

    this.over = function () {
      //console.log(this.hovering);
      if (mouseX <= x + w / 2 && mouseX >= x - w / 2 && mouseY <= y + h / 2 && mouseY >= y - h / 2) {
        this.hovering = true;
        // if(isMousePressed){
        //   this.click();
        // }

      }
      else {
        this.hovering = false;
      }
      return this.hovering;
    }

    this.click = function () {
      if (this.hovering && !this.clicked) {
        this.clicked = true;
        //console.log(this.clicked);
        this.hovering = false;
        if (isNextSceneButton) {
          nextScene();
        }
      }
    }
  }
}


function resetSceneTimer() {
  sceneTimer = millis();
}

function nextScene() {
  sceneNum++;
  sceneTimer = millis();
}

//get the amount of time passed in the current scene in seconds
function getTimePassed() {
  return (millis() - sceneTimer) / 1000;
}

//want these for the button
function mousePressed() {
  //console.log(mouseX, mouseY);
  //console.log(tennis);

  if (mouseX < formMaxX && mouseX > formMinX && mouseY < formMaxY && mouseY > formMinY) {
    formDone = true;
  }

  isMousePressed = true;
}

function mouseReleased() {

  isMousePressed = false;
  hiButton.click();
  readyButton.click();
  resultsButton.click();

  doneButton.click();
  beginButton.click();
}

//used from https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}