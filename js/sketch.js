let squig1, squig2, squig3; 
let myStrangers; 
let pixelW = pixelH = 150;
let rowNum; 
let colNum; 

function setup() {
  let cnv = createCanvas(452,452/*windowWidth, windowHeight*/);
  cnv.parent('popup-art');
  rowNum = Math.floor(height/pixelH);
  colNum = Math.floor(width/pixelW);
  colorMode(HSL);

  [squig1, squig2, squig3] = myGraphics();

  frameRate(10);
  
  let bodies = {
    liver: squig1,
    lover: squig2,
    loner: squig3 
  }
  
  let c = new Crowd(.3, bodies);


  myStrangers = strangerLattice(c);
}

function draw() {
  backgroundColor = color(36,90,92);
  let slot = color(331,91,30);
  let sc = 0 
  for(let r=0; r<rowNum/*4*/; r++) {
    for(let c=0; c<colNum/*4*/; c++) {
      curr = myStrangers[sc];
      let clean = random();
      if (clean<.15) {
        push();
        backgroundColor.setAlpha(100);
        fill(backgroundColor);
        noStroke();
        square(r*150,c*150,150);
      }
      pixel(r*150, c*150, curr);
      sc++;
    }
  }

  for (let i=0;i<=4; i++){
    strokeWeight(5);
    stroke(slot);
    let start = (i==0 || i==5) ? (i*149)+2.5: i*150;
    line(start, 0, start, 150*colNum);
    line(0,start,150*rowNum, start)
  }
}

function pixel(x, y, stranger) {
  curr.perceive();
  curr.experience();
  curr.express();
  image(curr.look, x, y, pixelW, pixelH);
}

function strangerLattice(c){
  
  myStrangerGrid = []; 
  let upperRow = [];
  for (let row=0; row<=rowNum/*5/*3*/; row++){
    // row start 
    let prevStranger = null; 
    let currRow = [];
    for (let col = 0; col<=colNum/*5/*3*/; col++){
        let currStranger = new Stranger(c, random(["lover", "liver", "loner"]));
        if (prevStranger != null) { // connect row level
          connectStrangers(prevStranger, currStranger);
        }
        if (upperRow.length > 0){ // connect col level
          connectStrangers(upperRow[col], currStranger);
        }
        myStrangerGrid.push(currStranger); // add to return array
        prevStranger = currStranger;
        currRow.push(currStranger); 
    }
    upperRow = currRow; // track as previous row
  }

  return myStrangerGrid;
}

function connectStrangers(stranger1, stranger2) {
  stranger1.addNeighbor(stranger2);
  stranger2.addNeighbor(stranger1); 
}

function myGraphics(){
  let consistentBackground = color(36,90,92);
  let secondaryStrokeColor = color(331,91,27);
  let strokeColor = color(331,91,30);
  let bM = DODGE;
  let incr =0;
  let sk=1; //1

  // 1 
  pg1 = createGraphics(300,300);
  pg1.stroke(strokeColor);

  for(let i=0;i<=300; i+=4){
    pg1.strokeWeight(1.2);
    pg1.line(i, 0, i, 300);
    if (i<=150) {
      sk = sk + .03*incr;
      pg1.strokeWeight(1.5+(.03*incr));
    }
    else {
      sk = sk - .02*incr;
      pg1.strokeWeight(3.3-(.03*incr));
    }
    pg1.blendMode(bM);
    pg1.line(i,21*sin(i*.039)+140, i, 21*sin(i*.039) + 270);
    incr++;
  }

  pg2 = createGraphics(300,300);
  pg2.stroke(strokeColor);
  
  incr=0;
  sk=1;
  for(let i=0;i<=300; i+=4){
    pg2.strokeWeight(1.2);
    pg2.line(i, 0, i, 300);
    if (i>=0 && i<=200) {
      sk = sk + .002*incr;
    }
    else {
      sk = sk - .002*incr;
      
    }
    pg2.strokeWeight(sk);
    pg2.blendMode(bM);
    pg2.line(i, 25*cos(-i*.039)+120, i, 25*cos(-i*.039) + 270);
    incr++;
  }

  pg3 = createGraphics(300,300);
  incr=0;
  sk = 1;
  for(let i=0;i<304; i+=4){
    pg3.stroke(secondaryStrokeColor)
    pg3.strokeWeight(1.2);
    pg3.line(i, 0, i, 300);
    if ((i>=50 && i<=175)|| (i>=175 && i<=250)) {
      sk = sk +.002*incr;
    }
    else if (i<=50) {
      sk = sk -.0025*incr;
    }
    else {
      sk = sk -.002*incr;
    }
    pg3.strokeWeight(sk);
    pg3.stroke(strokeColor);
    pg3.blendMode(bM);
    pg3.line(i, -20*cos(i*.03)+20, i, -20*cos(i*.03)+150);
    pg3.line(i, -20*cos(i*.03)+270, i, -20*cos(i*.08)+275);
    incr++;
  }

  return [pg1, pg2, pg3];
  
}