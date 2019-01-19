let freq = 0;
let wave = [];
let path = [];
let inptGainSlider;
let otptGainSlider;
let srcAmpSlider;
let stages = {};
let stageWidth = 100;
let numStages = 3;

let Controls = function () {
  this.sourceAmplitude = 40;
  this.inputGain = 2;
  this.outputGain = 1.5;
  this.inputNoise = true;
  this.outputNoise = true;
  this.inputVRail = 100;
  this.outputVRail = 200;
  this.inputPop = function transient() {
    stages.source.transient = true;
  };
};

let controls = new Controls();

function setup() {
  canvas = createCanvas(windowWidth, 600);
  canvas.parent('canvas');

  // create gui (dat.gui)

  let guiWidth = calcGuiWidth();
  let gui = new dat.GUI({
    autoPlace: false,
    width: guiWidth
  });
  let guiContainer = document.getElementById('guiDiv');
  guiContainer.appendChild(gui.domElement);

  gui.add(controls, 'sourceAmplitude', 0, 50).name("Source Amplitude").step(0.5);
  gui.add(controls, 'inputGain', 0, 10).name("Input Gain").step(0.2);
  gui.add(controls, 'outputGain', 0, 10).name("Output Gain").step(0.1);
  gui.add(controls, 'inputVRail', 5, 100).name("Input Voltage Rails").step(1);
  gui.add(controls, 'outputVRail', 50, 500).name("Output Voltage Rails").step(1);
  gui.add(controls, 'inputNoise').name("Input Noise?").listen();
  gui.add(controls, 'outputNoise').name("Output Noise?").listen();
  gui.add(controls, 'inputPop').name("Sudden Loud Input");


  // how many amp stages?
  stageWidth = width / numStages;

  stages.source = new Stage({
    name: "Source",
    x: 0,
    y: floor(height / 2),
    amplitude: controls.sourceAmplitude,
    limit: floor(stageWidth - 10),
    src: null
  });

  stages.input = new Stage({
    name: "Input Gain",
    x: floor(stageWidth - 10),
    y: floor(height / 2),
    amplitude: controls.inputGain,
    limit: floor(stageWidth - 10),
    maxVolt: controls.inputVRail,
    noise: true,
    src: stages.source
  });

  stages.output = new Stage({
    name: "Output Gain",
    x: floor(stageWidth - 10) + floor(stageWidth - 10),
    y: floor(height / 2),
    amplitude: controls.outputGain,
    limit: floor(stageWidth - 10),
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

function calcGuiWidth() {
  let gw = width / numStages;
  if (gw > 250) {
    return 250;
  } else if (gw < 100) {
    return 100;
  } else {
    return gw;
  }
}