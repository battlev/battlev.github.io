import p5 from 'https://esm.sh/p5@2.3.4?bundle';
import { Crowd } from './crowd.js';
import { Stranger } from './stranger.js';

let squig1, squig2, squig3; 
let myStrangers; 
let pixelW, pixelH;
let rowNum; 
let colNum; 
pixelW = pixelH = 150;

export function sketch(p) {
  p.setup = function() {
    p.createCanvas(452,452/*windowWidth, windowHeight*/);
    // cnv.parent('popup-art');
    rowNum = Math.floor(p.height/pixelH);
    colNum = Math.floor(p.width/pixelW);
    p.colorMode(p.HSL);

    [squig1, squig2, squig3] = myGraphics();

    p.frameRate(10);
    
    let bodies = {
      liver: squig1,
      lover: squig2,
      loner: squig3 
    }
    
    let c = new Crowd(.3, bodies);

    myStrangers = strangerLattice(c);
  };

  p.draw = function() {
    p.backgroundColor = p.color(36,90,92);
    let slot = p.color(331,91,30);
    let sc = 0 
    for(let r=0; r<rowNum/*4*/; r++) {
      for(let c=0; c<colNum/*4*/; c++) {
        let curr = myStrangers[sc];
        let clean = p.random();
        if (clean<.15) {
          p.push();
          p.backgroundColor.setAlpha(100);
          p.fill(p.backgroundColor);
          p.noStroke();
          p.square(r*150,c*150,150);
        }
        pixel(r*150, c*150, curr);
        sc++;
      }
    }

    for (let i=0;i<=4; i++){
      p.strokeWeight(5);
      p.stroke(slot);
      let start = (i==0 || i==5) ? (i*149)+2.5: i*150;
      p.line(start, 0, start, 150*colNum);
      p.line(0,start,150*rowNum, start)
    }
  }

  function pixel(x, y, stranger) {
    stranger.perceive();
    stranger.experience();
    stranger.express();
    p.image(stranger.look, x, y, pixelW, pixelH);
  }

  function strangerLattice(c){
    
    let myStrangerGrid = []; 
    let upperRow = [];
    for (let row=0; row<=rowNum/*5/*3*/; row++){
      // row start 
      let prevStranger = null; 
      let currRow = [];
      for (let col = 0; col<=colNum/*5/*3*/; col++){
          let currStranger = new Stranger(c, p.random(["lover", "liver", "loner"]));
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
    let consistentBackground = p.color(36,90,92);
    let secondaryStrokeColor = p.color(331,91,27);
    let strokeColor = p.color(331,91,30);
    let bM = p.DODGE;
    let incr =0;
    let sk=1; //1

    // 1 
    let pg1 = p.createGraphics(300,300);
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
      pg1.line(i,21*p.sin(i*.039)+140, i, 21*p.sin(i*.039) + 270);
      incr++;
    }

    let pg2 = p.createGraphics(300,300);
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
      pg2.line(i, 25*p.cos(-i*.039)+120, i, 25*p.cos(-i*.039) + 270);
      incr++;
    }

    let pg3 = p.createGraphics(300,300);
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
      pg3.line(i, -20*p.cos(i*.03)+20, i, -20*p.cos(i*.03)+150);
      pg3.line(i, -20*p.cos(i*.03)+270, i, -20*p.cos(i*.08)+275);
      incr++;
    }

    return [pg1, pg2, pg3];
    
  }
}