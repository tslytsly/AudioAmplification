class Stage {
  constructor(opts) {
    this.x = 0;
    this.y = 0;
    this.wave = [];
    this.limit = 150;
    this.amplitude = 10;
    this.frq = 0;
    this.src = null;
    this.maxVolt = 100;
    for (let opt in opts) {
      this[opt] = opts[opt];
    }
  }

  calc(amp, frq) {

    this.amplitude = amp;
    this.frq = frq;

    // if we have a source, all wave plots must be based on it
    if (this.src !== null) {
      for (let i = 0; i < this.src.wave.length; i++) {
        let y = this.src.wave[i] * this.amplitude;
        y = constrain(y, this.maxVolt * -1, this.maxVolt);
        this.wave[i] = y;
      }
    } else { //otherwise
      let y = this.amplitude * sin(this.frq);
      this.wave.unshift(y);
    }

    if (this.wave.length > this.limit) {
      this.wave.pop();
    }
  }

  draw() {
    // draw it
    push();
    stroke(255);
    translate(this.x, this.y);
    beginShape();
    noFill();
    for (let i = 0; i < this.wave.length; i++) {
      vertex(i, this.wave[i]);
    }
    endShape();

    // draw output voltage rails if not the source
    if (this.src) {
      stroke(255, 0, 0, 100);
      line(0, -this.maxVolt, this.limit, -this.maxVolt);
      line(0, this.maxVolt, this.limit, this.maxVolt);
    }
    pop();
  }

  init() {
    // fill the array at start
    for (let i = 0; i < width / 3; i++) {
      let y = this.amplitude * sin(this.frq);
      this.wave.unshift(y);
      this.frq += 0.05;
    }
  }

}