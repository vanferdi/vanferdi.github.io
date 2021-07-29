// chinese checkers, scaled for ipad
// just the board: no online interactivity

var piece_picked = false;
var pressed_x, pressed_y;
var current_piece = "0";
var xs;
var ys;
var pieces;

var s = 1.38; // what to expand the board by
var l = 64;   // 68 // pixels to adjust to the left by
var b = -40;  // pixels to adjust down by

var diam = 12;    // diameter of the peg holes
var diam_pc = 42; // diameter of the pegs

var Red = "#CE0C0C";  // color of the pieces
var Blue = "#1A4FD3";
var Green = "#4F9D0B";
var Yellow = "#F7C716";
var Black = "#000000";
var White = "#FFFFFF";

function preload() {
  pieces = loadStrings("resources/pieces.txt");
  backdrop = loadImage("resources/board2.jpg");
}

function setup() {
  createCanvas(768, 1024);
  
  xs = [
    325*s-l, 
    303.5*s-l, 346.5*s-l, 
    282*s-l, 325*s-l, 368*s-l, 
    260.5*s-l, 303.5*s-l, 346.5*s-l, 389.5*s-l, 
    67*s-l, 110*s-l, 153*s-l, 196*s-l, 239*s-l, 282*s-l, 325*s-l, 368*s-l, 411*s-l, 454*s-l, 497*s-l, 540*s-l, 583*s-l, 
    88.5*s-l, 131.5*s-l, 174.5*s-l, 217.5*s-l, 260.5*s-l, 303.5*s-l, 346.5*s-l, 389.5*s-l, 432.5*s-l, 475.5*s-l, 518.5*s-l, 561.5*s-l, 
    110*s-l, 153*s-l, 196*s-l, 239*s-l, 282*s-l, 325*s-l, 368*s-l, 411*s-l, 454*s-l, 497*s-l, 540*s-l, 
    131.5*s-l, 174.5*s-l, 217.5*s-l, 260.5*s-l, 303.5*s-l, 346.5*s-l, 389.5*s-l, 432.5*s-l, 475.5*s-l, 518.5*s-l, 
    153*s-l, 196*s-l, 239*s-l, 282*s-l, 325*s-l, 368*s-l, 411*s-l, 454*s-l, 497*s-l, 
    131.5*s-l, 174.5*s-l, 217.5*s-l, 260.5*s-l, 303.5*s-l, 346.5*s-l, 389.5*s-l, 432.5*s-l, 475.5*s-l, 518.5*s-l, 
    110*s-l, 153*s-l, 196*s-l, 239*s-l, 282*s-l, 325*s-l, 368*s-l, 411*s-l, 454*s-l, 497*s-l, 540*s-l, 
    88.5*s-l, 131.5*s-l, 174.5*s-l, 217.5*s-l, 260.5*s-l, 303.5*s-l, 346.5*s-l, 389.5*s-l, 432.5*s-l, 475.5*s-l, 518.5*s-l, 561.5*s-l, 
    67*s-l, 110*s-l, 153*s-l, 196*s-l, 239*s-l, 282*s-l, 325*s-l, 368*s-l, 411*s-l, 454*s-l, 497*s-l, 540*s-l, 583*s-l, 
    260.5*s-l, 303.5*s-l, 346.5*s-l, 389.5*s-l, 
    282*s-l, 325*s-l, 368*s-l, 
    303.5*s-l, 346.5*s-l, 
    325*s-l
  ];
  
  ys = [
    26*s-b, 
    63.23909*s-b, 63.23909*s-b, 
    100.4782*s-b, 100.4782*s-b, 100.4782*s-b, 
    137.7173*s-b, 137.7173*s-b, 137.7173*s-b, 137.7173*s-b, 
    174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 174.9564*s-b, 
    212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 212.1955*s-b, 
    249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 249.4346*s-b, 
    286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 286.6736*s-b, 
    323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 323.9127*s-b, 
    361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 361.1518*s-b, 
    398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 398.3909*s-b, 
    435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 435.63*s-b, 
    472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 472.8691*s-b, 
    510.1082*s-b, 510.1082*s-b, 510.1082*s-b, 510.1082*s-b, 
    547.3473*s-b, 547.3473*s-b, 547.3473*s-b, 
    584.5864*s-b, 584.5864*s-b, 
    621.8255*s-b
  ];
}

function draw() {
  background(255);
  fill(0);
  strokeWeight(1);
  displayBoard();
  displayPieces();
  pieceTracker();
  fill(150);
}

function mousePressed() {
  pressed_x = mouseX;
  pressed_y = mouseY;
}

function displayBoard() {
  image(backdrop,0,0);
  fill("#946322"); // fill(200);
  for (var i = 0; i < 121; i++) {
    ellipse(xs[i], ys[i], diam, diam);
  }
}

function displayPieces() {
  strokeWeight(3);
  for (var i = 0; i < 121; i++) {
    if (pieces[i] == "y") {
      fill(Yellow);
      ellipse(xs[i], ys[i], diam_pc, diam_pc);
    }
    if (pieces[i] == "r") {
      fill(Red);
      ellipse(xs[i], ys[i], diam_pc, diam_pc);
    }
    if (pieces[i] == "b") {
      fill(Blue);
      ellipse(xs[i], ys[i], diam_pc, diam_pc);
    }
    if (pieces[i] == "g") {
      fill(Green);
      ellipse(xs[i], ys[i], diam_pc, diam_pc);
    }
    if (pieces[i] == "k") {
      fill(Black);
      ellipse(xs[i], ys[i], diam_pc, diam_pc);
    }
    if (pieces[i] == "w") {
      fill(White);
      ellipse(xs[i], ys[i], diam_pc, diam_pc);
    }
  }
}

function pieceTracker() {  
  if (piece_picked === false) {
    for (var i = 0; i < 121; i++) {
      if (pressed_x >= xs[i] - diam_pc/2 && pressed_x <= xs[i] + diam_pc/2 &&
        pressed_y >= ys[i] - diam_pc/2 && pressed_y <= ys[i] + diam_pc/2) {
        current_piece = pieces[i];
        if (pieces[i]!="0") {
          piece_picked = true;
          pieces[i] = "0";
          pressed_x = 0;
          pressed_y = 0;
        }
      }
    }
  }
  if (piece_picked === true) {
    if (current_piece!="0") {
      if (current_piece=="r") { fill(Red);   }
      if (current_piece=="y") { fill(Yellow);}
      if (current_piece=="b") { fill(Blue);  }
      if (current_piece=="g") { fill(Green); }
      if (current_piece=="k") { fill(Black); }
      if (current_piece=="w") { fill(White); }
      ellipse(mouseX, mouseY, diam_pc, diam_pc);
      stroke("#909090");
      strokeWeight(10);
      ellipse(mouseX, mouseY, diam_pc, diam_pc);
      stroke(0);
    }
    for (var j = 0; j < 121; j++) {
      if (pressed_x >= xs[j] - diam_pc/2 && pressed_x <= xs[j] + diam_pc/2 &&
        pressed_y >= ys[j] - diam_pc/2 && pressed_y <= ys[j] + diam_pc/2) { 
        if (pieces[j]=="0") { 
          piece_picked = false;
          pieces[j] = current_piece;
          pressed_x = 0;
          pressed_y = 0;
        }
      }
    }
  }
}

