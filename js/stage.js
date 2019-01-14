class Stage {
  constructor(opts) {
    this.x = 0;
    this.y = 0;
    this.wave = [];
    this.noiseArr = [];
    this.limit = 150;
    this.amplitude = 10;
    this.frq = 0;
    this.src = null;
    this.maxVolt = 100;
    this.noise = false;
    this.noiseLvl = 0.5;
    for (let opt in opts) {
      this[opt] = opts[opt];
    }
  }

  calc(amp, frq) {

    this.amplitude = amp;
    this.frq = frq;

    // noise function
    if (this.noise) {
      let n = this.noiseLvl * this.amplitude;
      n *= sin(random(PI, -PI));
      n = constrain(n, this.maxVolt * -1, this.maxVolt)
      this.noiseArr.unshift(n);
    }

    // let n = this.noiseArr[i] * (this.amplitude * 0.2);
    // n = constrain(n, this.maxVolt * -1, this.maxVolt);
    // this.noiseArr[i] = n;

    // if we have a source, all wave plots must be based on it
    if (this.src !== null) {
      for (let i = 0; i < this.src.wave.length; i++) {
        let y = this.src.wave[i] * this.amplitude;
        y = constrain(y, this.maxVolt * -1, this.maxVolt);
        this.wave[i] = y;
        if (this.noise) {
          this.wave[i] += this.noiseArr[i];
        }
      }
    } else { //otherwise
      let y = this.amplitude * sin(this.frq);
      this.wave.unshift(y);
    }


    if (this.wave.length > this.limit) {
      this.wave.pop();
    }

    if (this.noiseArr.length > this.limit) {
      this.noiseArr.pop();
    }
  }

  draw() {
    // draw main wave
    strokeWeight(1);
    push();
    stroke(255);
    translate(this.x, this.y);
    beginShape();
    noFill();
    for (let i = 0; i < this.wave.length; i++) {
      vertex(i, this.wave[i]);
    }
    endShape();

    // draw noise
    if (this.noise) {
      push();
      stroke(255, 100);
      translate(0, 0);
      beginShape();
      noFill();
      for (let i = 0; i < this.noiseArr.length; i++) {
        vertex(i, this.noiseArr[i]);
      }
      endShape();
      pop();
    }

    // draw output voltage rails if not the source
    if (this.src) {
      stroke(255, 0, 0, 100);
      line(0, -this.maxVolt, this.limit, -this.maxVolt);
      line(0, this.maxVolt, this.limit, this.maxVolt);
    }
    pop();

    // Draw name if configured
    if (this.name) {
      textSize(24);
      textAlign(CENTER);
      fill(255);
      text(this.name, this.x + this.limit / 2, 50);
    }

    // draw vertical lines
    stroke(255, 100);
    strokeWeight(4);
    line(this.x, 0, this.x, height);
    // line(this.x + this.limit + 2, 0, this.x + this.limit + 2, height);

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