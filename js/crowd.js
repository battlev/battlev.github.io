/** 
  A crowd is a place where strangers (co)exist. It is more than any one stranger, more than all of them. Crowds have an energy and aesthetic of their own. The same stranger might look and act differently in a different crowd.
 */
class Crowd {
  /**
    temperature: is it hot in here? are the vibes off? a float value in range [0,1]. the higher, the more extreme behaviors become.
    looks: a dictionary of (personality, shape) key-value pairs.
  */
  constructor(temperature, looks) {
    this.temperature = temperature;
    this.looks = looks;
  }
}
