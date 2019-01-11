class Stage {
  constructor(opts) {
    this.x = 0;
    this.y = 0;
    this.wave = [];
    this.limit = 150;
    this.amplitude = 10;
    this.frq = 0;
    for (let opt in opts) {
      this[opt] = opts[opt];
    }
  }

  calc(amp, frq) {

    this.amplitude = amp;
    this.frq = frq;
    // calc wave
    let wavePlot = this.amplitude * sin(this.frq);
    this.wave.unshift(wavePlot);

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