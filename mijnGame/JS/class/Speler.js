
class Speler {
  
    constructor() {
    this.x = 400;
    this.y = 300;
    // this.animatie = [];
    // this.frameNummer =  3;
    this.stapGrootte = 4;
    this.health = 100;
    this.maxhealth = 100;
  }
  
  beweeg() {
    var dx = 0;
    var dy = 0;

    if (keyIsDown(LEFT_ARROW)) {
        dx = -1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        dx = 1;
    }

    if (keyIsDown(UP_ARROW)) {
        dy = -1;
    }

    if (keyIsDown(DOWN_ARROW)) {
        dy = 1;
    }

    var afstand = Math.sqrt(dx * dx + dy * dy);

    if (afstand > 0) {
        this.x += (dx / afstand) * this.stapGrootte;
        this.y += (dy / afstand) * this.stapGrootte;
    }

    this.x = constrain(this.x, 25, canvas.width - 25);
    this.y = constrain(this.y, 25, canvas.height - 25);
  }
  
  teken() {
    fill('white');
    circle(this.x, this.y, 50);
  }

}
