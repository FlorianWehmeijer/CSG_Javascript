
function setup() {
  canvas = createCanvas(1200,800);
  canvas.parent('processing');
  frameRate(60);

  spel = new Spel();
  spel.nieuwSpel();
}

function keyPressed() {
  spel.verwerkInvoer();
}

function draw() {
  spel.teken();
}