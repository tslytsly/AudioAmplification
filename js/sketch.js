let freq = 0;
let wave = [];
let path = [];
let inptGainSlider;
let otptGainSlider;
let srcAmpSlider;
let stages = {};

function setup() {
  createCanvas(windowWidth, 400);
  srcAmpSlider = createSlider(0, 50, 20, 0.5);
  inptGainSlider = createSlider(0, 10, 2, 0.2);
  otptGainSlider = createSlider(0, 10, 2, 0.2);

  stages.source = new Stage({
    x: 50,
    y: floor(height / 2),
    amplitude: srcAmpSlider.value(),
    limit: floor(width / 3 - 10),
    src: null
  });

  stages.input = new Stage({
    x: 50 + floor(width / 3 - 10),
    y: floor(height / 2),
    amplitude: inptGainSlider.value(),
    limit: floor(width / 3 - 10),
    maxVolt: 100,
    src: stages.source
  });

  stages.output = new Stage({
    x: 50 + floor(width / 3 - 10) + floor(width / 3 - 10),
    y: floor(height / 2),
    amplitude: otptGainSlider.value(),
    limit: floor(width / 3 - 10),
    maxVolt: 150,
    src: stages.input
  });

}

function draw() {
  background(0);


  stages.source.calc(srcAmpSlider.value(), freq);
  stages.input.calc(inptGainSlider.value());
  stages.output.calc(otptGainSlider.value());

  for (const key in stages) {
    stages[key].draw();
  }

  // // draw input wave
  // stroke(255);
  // translate(wave.length, 0);
  // beginShape();
  // noFill();
  // for (let i = 0; i < wave.length; i++) {
  //   let y = wave[i] * inptGainSlider.value();
  //   if (y > 100) y = 100;
  //   if (y < -100) y = -100;
  //   vertex(i, y);
  // }
  // endShape();

  // // draw input voltage rails
  // stroke(255, 0, 0, 100);
  // line(0, -100, wave.length, -100);
  // line(0, 100, wave.length, 100);

  // // draw output wave
  // stroke(255);
  // translate(wave.length, 0);
  // beginShape();
  // noFill();
  // for (let i = 0; i < wave.length; i++) {
  //   let y = wave[i] * inptGainSlider.value() * otptGainSlider.value();
  //   if (y > 150) y = 150;
  //   if (y < -150) y = -150;
  //   vertex(i, y);
  // }
  // endShape();

  // // draw output voltage rails
  // stroke(0, 0, 255, 100);
  // line(0, -150, wave.length, -150);
  // line(0, 150, wave.length, 150);

  freq += 0.05;
}