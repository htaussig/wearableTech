
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
  size(800, 800);
}

void draw(){
  background(0);
}