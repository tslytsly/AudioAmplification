let freq = 0;
let wave = [];
let path = [];
let inptGainSlider;
let otptGainSlider;
let srcAmpSlider;
let stages = {};

function setup() {
  createCanvas(windowWidth, 600);
  srcAmpSlider = createSlider(0, 50, 40, 0.5);
  inptGainSlider = createSlider(0, 10, 2, 0.2);
  otptGainSlider = createSlider(0, 10, 1.5, 0.1);

  stages.source = new Stage({
    name: "Source",
    x: 50,
    y: floor(height / 2),
    amplitude: srcAmpSlider.value(),
    limit: floor(width / 3 - 10),
    src: null
  });

  stages.input = new Stage({
    name: "Input Gain",
    x: 50 + floor(width / 3 - 10),
    y: floor(height / 2),
    amplitude: inptGainSlider.value(),
    limit: floor(width / 3 - 10),
    maxVolt: 100,
    noise: true,
    src: stages.source
  });

  stages.output = new Stage({
    name: "Output Gain",
    x: 50 + floor(width / 3 - 10) + floor(width / 3 - 10),
    y: floor(height / 2),
    amplitude: otptGainSlider.value(),
    limit: floor(width / 3 - 10),
    maxVolt: 200,
    noise: true,
    noiseLvl: 1.5,
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

  freq += 0.05;
}