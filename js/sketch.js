let freq = 0;
let wave = [];
let path = [];
let inptGainSlider;
let otptGainSlider;
let srcAmpSlider;
let stages = {};

let Controls = function() {
  this.sourceAmplitude = 40;
  this.inputGain = 2;
  this.outputGain = 1.5;
  this.inputNoise = true;
  this.outputNoise = true;
  this.inputVRail = 100;
  this.outputVRail = 200;
};

let controls = new Controls();

function setup() {
  canvas = createCanvas(windowWidth, 600);
  canvas.parent('canvas');

  // create gui (dat.gui)
  let gui = new dat.GUI({
    width: 295
  });
  gui.add(controls, 'sourceAmplitude', 0, 50).name("Source Amplitude").step(0.5);
  gui.add(controls, 'inputGain', 0, 10).name("Input Gain").step(0.2);
  gui.add(controls, 'outputGain', 0, 10).name("Output Gain").step(0.1);
  gui.add(controls, 'inputVRail', 5, 100).name("Input Voltage Rails").step(1);
  gui.add(controls, 'outputVRail', 50, 500).name("Output Voltage Rails").step(1);
  gui.add(controls, 'inputNoise').name("Input Noise?").listen();
  gui.add(controls, 'outputNoise').name("Output Noise?").listen();


  stages.source = new Stage({
    name: "Source",
    x:0,
    y: floor(height / 2),
    amplitude: controls.sourceAmplitude,
    limit: floor(width / 3 - 10),
    src: null
  });

  stages.input = new Stage({
    name: "Input Gain",
    x: floor(width / 3 - 10),
    y: floor(height / 2),
    amplitude: controls.inputGain,
    limit: floor(width / 3 - 10),
    maxVolt: controls.inputVRail,
    noise: true,
    src: stages.source
  });

  stages.output = new Stage({
    name: "Output Gain",
    x: floor(width / 3 - 10) + floor(width / 3 - 10),
    y: floor(height / 2),
    amplitude: controls.outputGain,
    limit: floor(width / 3 - 10),
    maxVolt: controls.outputVRail,
    noise: true,
    noiseLvl: 1.5,
    src: stages.input
  });

}

function draw() {
  background(0);


  stages.source.calc(controls.sourceAmplitude, freq);
  stages.input.calc(controls.inputGain);
  stages.output.calc(controls.outputGain);

  for (const key in stages) {
    stages[key].draw();
  }

  freq += 0.05;

  // get control vals
  stages.input.noise = controls.inputNoise;
  stages.input.maxVolt = controls.inputVRail;
  stages.output.noise = controls.outputNoise;
  stages.output.maxVolt = controls.outputVRail;

}