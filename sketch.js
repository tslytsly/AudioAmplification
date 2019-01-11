let time = 0;
let wave = [];
let path = [];
let srcAmp = 20;
let inptGain;
let otptGain = 2;
let inptGainSlider;

function setup() {
	createCanvas(600, 400);
	inptGainSlider = createSlider(0, 10, 2, 0.2);
}

function draw() {
	background(0);

	// calc wave
	let radius = srcAmp;
	let y = radius * sin(time);
	wave.unshift(y);


	// draw source wave
	stroke(255);
	translate(50, 200);
	beginShape();
	noFill();
	for (let i = 0; i < wave.length; i++) {
		vertex(i, wave[i]);
	}
	endShape();

	// draw input wave
	stroke(255);
	translate(175, 0);
	beginShape();
	noFill();
	for (let i = 0; i < wave.length; i++) {
		let y = wave[i] * inptGainSlider.value();
		if (y > 100) y = 100;
		if (y < -100) y = -100;
		vertex(i, y);
	}
	endShape();

	stroke(255, 0, 0, 100);
	line(0, -100, 150, -100);
	line(0, 100, 150, 100);

	time += 0.05;


	if (wave.length > 150) {
		wave.pop();
	}
}