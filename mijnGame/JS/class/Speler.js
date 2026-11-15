
class Speler {
  
    constructor() {
    this.x = 400;
    this.y = 300;
    // this.animatie = [];
    // this.frameNummer =  3;
    this.stapGrootte = 4;
  }
  
  beweeg() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.stapGrootte;
    //   this.frameNummer = 2;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.stapGrootte;
    //   this.frameNummer = 1;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.stapGrootte;
    //   this.frameNummer = 4;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.stapGrootte;
    //   this.frameNummer = 5;
    }
    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - 25);
    }
  
  teken() {
    circle(this.x, this.y, 50);
  }

}
