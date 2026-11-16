import p5 from 'https://esm.sh/p5@2.3.4?bundle';

let canvasWidth; //600
let canvasHeight; //800

// starting spot for light blue rectangle
let blueSpotRow = 0;
let blueSpotCol = 0;

let blueSpotCols = 12; //3;
let blueSpotRows = 2; //2;

export function sketch(p) {
  
  p.setup = function() {
  canvasWidth = 452;
  canvasHeight = 452;
  p.createCanvas(canvasWidth, canvasHeight);
  p.colorMode(p.HSL);
  p.frameRate(4);
}

p.draw = function() {
  // noLoop();

  p.blendMode(p.BLEND);
  p.noStroke();

  let backgroundColor = p.color(237, 39, 24);

  p.background(backgroundColor);

  blueSpot();

  // update every 5th frame
  if (p.frameCount % 5 == 0) {
    // RANDOM POSITION
    blueSpotCol = p.random(0, blueSpotCols);
    blueSpotRow = p.random(0, blueSpotRows);

    if (p.frameCount % 2 == 0) {
        blueSpotCol = p.random(0, blueSpotCols);
        blueSpotRow = p.random(0, blueSpotRows);
        blueSpot();
      }
  }

  rectanglishBoard();
}

function blueSpot() {
  // console.log(blueSpotRow + "," + blueSpotCol);
  let spotW = canvasWidth / blueSpotCols;
  let spotH = canvasHeight / blueSpotRows;
  let spotX = spotW * blueSpotCol;
  let spotY = spotH * blueSpotRow;

  let fillColor = p.color(237, 80, 77);
  // every 4th frame has a 50|50 change of variation
  if (p.frameCount % 3 == 0) {
    fillColor = p.random([p.color(217, 79, 80), p.color(217, 79, 77)]);
    // blendMode(ADD);
  }
  fillColor.setAlpha(35);
  
  p.fill(fillColor);
  for(let b=0; b<20; b++) {
    p.rect(spotX+(b*.1), spotY+(b*1.815), spotW, spotH);
  }
}

function rectanglishBoard() {
  // grid lines
  let rows = 15; // 16
  let cols = 25;

  // grid gutters
  let bufferX = 2;
  let bufferY = 0;

  // cell widths
  let xGrid = (canvasWidth - bufferX) / cols; // each cell width
  let yGrid = (canvasHeight - bufferY) / rows; // each cell height

  // vertex range around cell edge
  let jitterSpace = 5;

  let xStart = bufferX;
  let yStart = bufferY;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols + 1; x++) {
      let edgeList = identifyEdges(xStart, yStart, xGrid, yGrid);
      let [v1, v2, v3, v4] = randomVertices(edgeList, jitterSpace);
      if (xStart < canvasWidth - bufferX) {
        rectanglish(v1, v2, v3, v4);
      }
      if ((x == 0) & (y != 0)) {
        xStart = 0;
      } else {
        xStart += xGrid + bufferX;
      }
    }
    yStart += yGrid + bufferY;
  }
}

function randomVertices(corners, vertexRange) {
  let randoms = [];
  let randomX;
  let randomY;
  for (let i = 0; i < corners.length; i++) {
    let cornerX = (randomX = corners[i].x);
    let cornerY = (randomY = corners[i].y);
    switch (corners[i].xType) {
      case "left":
        randomX = p.random(cornerX, cornerX + vertexRange);
        break;
      case "right":
        randomX = p.random(cornerX - vertexRange, cornerX);
        break;
      default:
        break;
    }
    switch (corners[i].yType) {
      case "top":
        randomY = p.random(cornerY, cornerY + vertexRange);
        break;
      case "bottom":
        randomY = p.random(cornerY - vertexRange, cornerY);
        break;
      default:
        break;
    }
    randoms.push({
      x: randomX,
      y: randomY,
    });
  }
  return randoms;
}

function identifyEdges(xStart, yStart, cellW, cellH) {
  // top left
  let topLeft = {
    x: xStart,
    y: yStart,
    yType: "top",
    xType: "left",
  };

  // top right
  let topRight = {
    x: xStart + cellW,
    y: yStart,
    yType: "top",
    xType: "right",
  };

  // bottom left
  let bottomLeft = {
    x: xStart,
    y: yStart + cellH,
    yType: "bottom",
    xType: "left",
  };

  // bottom right
  let bottomRight = {
    x: xStart + cellW,
    y: yStart + cellH,
    yType: "bottom",
    xType: "right",
  };

  return [topLeft, topRight, bottomLeft, bottomRight];
}

function rectanglish(v1, v2, v3, v4) {

  let marsBrightness = p.random(45, 54);

  // .1% chance of a faint pink rectanglish on each grid
  if (p.int(p.random(0,999)) == 8) {
    marsBrightness = 75;
  }

  let marsColor = p.color(1, 56.2, marsBrightness);
  marsColor.setAlpha(45); //90
 
  p.blendMode(p.BLEND);
  p.fill(marsColor);
  let shift = 0;
  for(let b=0; b<25; b++) {
    p.beginShape();  
    p.vertex(v1.x, v1.y+(shift*b));
    p.vertex(v2.x+(shift*(b/10)), v2.y+(shift*b));
    p.vertex(v4.x, v4.y+(shift*b));
    p.vertex(v3.x-(shift*(b/10)), v3.y+(shift*b));
    p.endShape();
    shift+=.02;
  }
}
}