var smile,
    loop,
    filter;

function preload() {
  soundFormats('wav', 'ogg');
  loop = loadSound('assets/loop.wav');
  smile = loadModel('assets/smile.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  loop.setVolume(1);
  loop.play();
  loop.loop();

  filter = new p5.LowPass();
}

function draw() {
  background('#FFFF00');
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  normalMaterial();
  model(smile);

  loop.disconnect();
  loop.connect(filter);

  // set the BandPass frequency based on mouseX
  var freq = map (mouseX, 0, width, 10, 22050);
  // Map mouseY to resonance (volume boost) at the cutoff frequency
  var res = map(mouseY, 0, height, 15, 5);

  filter.set(freq, res);
}
