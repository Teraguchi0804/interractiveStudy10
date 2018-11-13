'use strict';

var count = 0;
var tileCountX = 10;
var tileCountY = 10;
var tileWidth  = 0;
var tileHeight = 0;

var colorStep = 15;

var circleCount = 0;
var endSize = 0;
var endOffset = 0;

var actRandomSeed = 0;

var diameter; 
var angle = 0;

function setup() {
  createCanvas(800, 800);
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  noFill();
  stroke(0, 128);
}

function draw() {
  // console.log("aaaa");
  background(255);
  randomSeed(actRandomSeed);

  translate(tileWidth / 2, tileHeight / 2);

  circleCount = mouseX / 30 + 1;
  endSize = map(mouseX, 0, max(width, mouseX), tileWidth / 2, 0);
  endOffset = map(mouseY, 0, max(height, mouseY), 0, (tileWidth - endSize) / 2);

  for (var gridY = 0; gridY <= tileCountY; gridY++) {
    for (var gridX = 0; gridX <= tileCountX; gridX++) {
      push();
      translate(tileWidth * gridX, tileHeight * gridY);
      // scale(1, tileHeight / tileWidth);
      scale(1, random(tileHeight / tileWidth, 2));
      // var d1 = 10 + (sin(angle) * diameter/2) + diameter/2;
      // console.log(d1);
      var toggle = int(random(0, 4));
      if (toggle == 0) rotate(-HALF_PI);
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);

      // draw module
      for (var i = 0; i < circleCount; i++) {
        var diameter = map(i, 0, circleCount, tileWidth, endSize);
        var offset = map(i, 0, circleCount, 0, endOffset);
        var c = color(random(0, 255), random(0, 255), random(0, 255)); // Define color 'c'
        fill(c);
        ellipse(offset, 0, diameter, diameter);
      }
      pop();
    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
