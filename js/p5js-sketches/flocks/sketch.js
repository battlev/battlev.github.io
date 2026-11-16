import { Walker } from './walker.js';
import p5 from 'https://esm.sh/p5@2.3.4?bundle';

let walkers;
let origin;
let canvasW;
let canvasH;
let canvas;

export function sketch(p) {
  p.setup = function() {
    canvasW = 452;//windowWidth;
    canvasH = 452;//windowHeight;
    p.createCanvas(canvasW, canvasH);
    p.colorMode(p.HSL);
    p.frameRate(15);
    origin = p.createVector(0,0);
    walkers = createWalkers(600);
    createFriends(walkers);
  }

p.draw = function() {
  sky();
  if (p.frameCount % 50 == 0) {
    createFriends(walkers);
  }
  drawWalkers(walkers);
}

function sky() {
  p.background(p.color(198,96,10));
}

function createWalkers(total) {
  let wArray = [];
  for (let i = 0; i < total; i++) {
    let w = new Walker(p.random(4, canvasW-4), p.random(4, canvasH-4), p, canvasW, canvasH);
    wArray.push(w);
  }
  return wArray;
}

function createFriends(walkerArray) {

  walkerArray = sortByDistance(walkerArray, origin);
  let s = 0;
  for (let i = 0; i <= walkerArray.length / 5 - 1; i++) {
    // groups of 5 
    makeFriends(walkerArray, i + s, i + s + 5);
    s += 4;
  }
  
}

function makeFriends(walkerArray, start, stop) {
  let curr;
  let newFriends;
  for (let x = start; x < stop; x++) {
    curr = walkerArray[x];
    newFriends = [];
    for (let y = start; y < stop; y++) {
      if (x != y) {
        newFriends.push(walkerArray[y]);
      }
    }
    curr.replaceFriends(newFriends);
    curr.friends = sortByDistance(curr.friends, curr.position);
  }
}

function sortByDistance(walkerArray, vec) {
  let newWalkerArray = walkerArray.toSorted(
    (a, b) =>
      p5.Vector.sub(a.position, vec).magSq() -
      p5.Vector.sub(b.position, vec).magSq()
  );
  return newWalkerArray;
}

function drawWalkers(walkerArray) {
  walkerArray.sort((a,b) => (a.color[2] - b.color[2]));
  for (let i = 0; i < walkerArray.length; i++) {
    walkerArray[i].move();
    walkerArray[i].draw();
  }
}
}