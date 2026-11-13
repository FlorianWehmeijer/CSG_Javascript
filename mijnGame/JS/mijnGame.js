
function setup() {
  canvas = createCanvas(1200,800);
  canvas.parent('processing');
  spel = new Spel();
  spel.nieuwSpel();
  spel.teken();
}

function keyPressed() {
  spel.verwerkInvoer();
  spel.teken();
}
