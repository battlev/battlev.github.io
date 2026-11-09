/**
 */

class Stranger {
  static PERSONALITY_AFFINITIES() {
    return {
      loner: {
        // unlikely to be influenced or changed
        malleability: 0.1,
        affinities: {
          loner: 0.75,
          lover: 0.1,
          liver: 0.15,
        },
      },
      lover: {
        //  open to influence, prefers social behavior
        malleability: 0.5,
        affinities: {
          loner: 0.2,
          lover: 0.4,
          liver: 0.4,
        },
      },
      liver: {
        // highly influenced, no preferred behavior
        malleability: 0.8,
        affinities: {
          loner: 0.33,
          lover: 0.33,
          liver: 0.33,
        },
      }
    };
  }

  /**
    crowd: an instance of the Crowd class.
    personality: a string denoting one of three personality types (loner, lover, liver).
    neighbors: an array of Stranger instances.
  */
  constructor(crowd, personality, neighbors) {
    this.crowd = crowd;
    this.personality = personality;
    // console.log(personality);
    this.mal = Stranger.PERSONALITY_AFFINITIES()[this.personality].malleability;
    this.aff = Stranger.PERSONALITY_AFFINITIES()[this.personality].affinities;
    this.look = crowd.looks[personality];
    this.neighbors = neighbors ?? [];
  }

  /** - notice your world -
   Find the current personality states of neighbors and . 
  */
  perceive() {
    let neighbor_personalities = this.neighbors.map((n) => n.personality);
    const my_mal = this.mal;
    let my_aff = {...this.aff};
    let influence = neighbor_personalities.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 1) + 1;
      return acc;
    }, {});

    //  multiply every present neighbor affinity
    let runningTotal = 0;
    for (const aff_key in my_aff) {
      let inf = (influence[aff_key] || 1);
      let current_aff = my_aff[aff_key];
      let new_aff = current_aff * inf * my_mal;
      my_aff[aff_key] = new_aff;
      runningTotal += new_aff;
    }

    // renormalize 
    for (const aff_key in my_aff) {
      my_aff[aff_key] = my_aff[aff_key]/runningTotal;
    }

    this.aff = my_aff
  }

  /** - feel (new?) feelings  -
    Roll the dice on a new personality.  
  */
  experience() {
    
    const probs = Object.entries(this.aff).sort((a,b) => a[1] - b[1]);
    const chance = random();

    let interval = 0;
    for (let i=0; i<probs.length; i++) {
      interval += probs[i][1];
      if (chance < interval) {
        this.personality = probs[i][0];
        break;
      }
    }
    
  }

  /** - perform thy self - 
   Update behavior and look based on personality.
  */
  express() {
    this.mal = Stranger.PERSONALITY_AFFINITIES()[this.personality].malleability; // mal
    this.aff = Stranger.PERSONALITY_AFFINITIES()[this.personality].affinities;
    this.look = this.crowd.looks[this.personality];
  }

  addNeighbor(neighbor){
    this.neighbors.push(neighbor);
  }

  removeNeighbor(neighbor){
    this.neighbors.pop(neighbor);
  }
}
