// wrap position around the screen
function bumpVal(inVal, mini, maxi) {
  if (inVal > maxi) return mini;
  if (inVal < mini) return maxi;
  return inVal;
}

export class Walker {

  constructor(x, y, p, w, h) {
    
    // LOCATION AND DRAW PROPERTIES 
    this.w = w;
    this.h = h;
    this.p = p;
    this.size = 3;
    this.color =  [189, 210, this.p.random(20,85)];
    this.position = this.p.createVector(x, y);
    // the points which following walkers will move toward
    this.tail = this.p.createVector(this.position.x - this.size/2, this.position.y);
    this.desiredPoint = this.p.createVector(this.w, this.p.randomGaussian(this.h/2, this.h/20)); /*createVector(randomGaussian(width-width/3(/2), width/10), randomGaussian(height-height/3/2, height/10));*/
    
    // MOVEMENT PROPERTIES
    this.velocity = this.p.createVector(.25, .25);
    this.speed = .5;
    this.maxSpeed = 2;
    this.rotationAngle;

    // BEHAVIOR PROPERTIES 
    this.friends = []; 
    this.currentLeader;
    this.affinity = this.p.randomGaussian(80, 15)/100;
    this.freedomCount = 0;
    this.followCount = 0;
    this.maxDuration = 40;
    this.minDuration = 20;
    this.freedomDuration = 0;
  }

  addFriend(walker){
    this.friends.push(walker);
  }
  
  addVelocity(velvector) {
    this.velocity.add(velvector);
  }
  
  move() {
    if (this.freedomDuration == 0) {
      let chance = this.p.random();
      if(chance <= this.affinity){ // move as a flock 
        this.freedomDuration = 0;
        this.freedomCount = 0;
        this.followCount++;
        this.followLeader();
      }
      else { // move independently 
        this.freedomDuration = this.p.int(this.p.random(this.minDuration, this.maxDuration));
        this.followCount = 0;
        this.freedomCount++;
        this.moveFreely();
        this.freedomDuration--;
      }
    }
    else {
      this.freedomCount++;
      this.moveFreely();
      this.freedomDuration--;
    }

    this.limitVelocity();
    this.rotationAngle = this.velocity.heading();
    this.position.add(this.velocity);
    this.bump();
  }

  moveFreely() {
    this.speed = this.speed + this.freedomCount/20;
    this.moveTowards(this.desiredPoint)
  }
  
  followLeader() {
    this.speed = this.speed + this.followCount/20;
    if (this.currentLeader == null){
      this.pickLeader();
    }
    this.follow(this.currentLeader);
  }

  pickLeader() {
    let index = this.p.int(this.p.randomGaussian(0, .3)); // more likely to pick closest
    if(index < 0){
      index = index * -1;
    }
    this.currentLeader = this.friends[index];
  }

  replaceFriends(newFriendArray) {
    if(!newFriendArray.includes(this.currentLeader)){
      this.currentLeader = null;
    }
    this.friends = newFriendArray;
  }
  
  limitVelocity() {
    if(this.velocity.mag() > this.maxSpeed) {
      this.velocity.setMag(this.maxSpeed);
    }
  }
  
  moveTowards(vec) {
    let diff = vec.copy().sub(this.position);
    this.velocity.add(diff.mult(0.01)).setMag(this.speed);
  }
  
  moveAwayFrom(vec, speed = 1) {
    let diff = this.position.copy().sub(vec);
    this.velocity = diff.setMag(speed);
  }

  bump() {
    this.position.x = bumpVal(this.position.x, 0, this.w);
    this.position.y = bumpVal(this.position.y, 0, this.h);
    this.velocity.x = this.p.constrain(this.velocity.x, 0, 2);
    this.velocity.y = this.p.constrain(this.velocity.y, 0, 2);
  }

  follow(walker) {
    try{
    this.moveTowards(walker.tail);
    }
    catch (error){
      console.error(walker);
    }
  }

  draw() {
    // let chance = random(); 
    this.p.stroke(this.p.color(...this.color));
    this.p.fill(this.p.color(...this.color));
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.rotationAngle);
    this.p.line(0 - this.size/2, 0, 0 + this.size/1.5, 0); 
    if (this.freedomDuration > 0 /**chance >= .15**/){
      // soaring 
      this.p.triangle(0, 0,
               0 + this.size/2, 0 + 4,
               0 + this.size/2, 0 - 4);
    }
    else {
      // pushing
      this.p.triangle(0 + this.size/2, 0,
               0, 0 + 4,
               0, 0 - 4);
    }
    this.p.pop();
  }
}