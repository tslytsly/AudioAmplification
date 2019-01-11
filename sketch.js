let freq = 0;
let wave = [];
let path = [];
let srcAmp = 20;
let inptGain;
let otptGain;
let inptGainSlider;
let otptGainSlider;

function setup() {
	createCanvas(windowWidth, 400);
	inptGainSlider = createSlider(0, 10, 2, 0.2);
	otptGainSlider = createSlider(0, 10, 2, 0.2);

	// fill the array at start
	for (let i = 0; i < width / 3; i++) {
		let radius = srcAmp;
		let y = radius * sin(freq);
		wave.unshift(y);
		freq += 0.05;
	}
}

function draw() {
	background(0);

	// calc wave
	let radius = srcAmp;
	let y = radius * sin(freq);
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
	translate(wave.length, 0);
	beginShape();
	noFill();
	for (let i = 0; i < wave.length; i++) {
		let y = wave[i] * inptGainSlider.value();
		if (y > 100) y = 100;
		if (y < -100) y = -100;
		vertex(i, y);
	}
	endShape();

	// draw input voltage rails
	stroke(255, 0, 0, 100);
	line(0, -100, wave.length, -100);
	line(0, 100, wave.length, 100);

	// draw output wave
	stroke(255);
	translate(wave.length, 0);
	beginShape();
	noFill();
	for (let i = 0; i < wave.length; i++) {
		let y = wave[i] * inptGainSlider.value() * otptGainSlider.value();
		if (y > 150) y = 150;
		if (y < -150) y = -150;
		vertex(i, y);
	}
	endShape();

	// draw output voltage rails
	stroke(0, 0, 255, 100);
	line(0, -150, wave.length, -150);
	line(0, 150, wave.length, 150);

	freq += 0.05;


	if (wave.length > floor(width / 3 - 10)) {
		wave.pop();
	}
}