class Zombie {
    constructor() {
        this.x = random(50,600);
        this.y = random(50,600);
        this.snelheid = 0.75;
        this.geraakt = false;
    }

    teken() {
        fill('green');
        circle(this.x, this.y, 50);
    }

    beweeg(speler) {
        var dx = speler.x - this.x;
        var dy = speler.y - this.y;

        var afstand = Math.sqrt(dx * dx + dy * dy);

        if (afstand > 0) {
            this.x += (dx / afstand) * this.snelheid;
            this.y += (dy / afstand) * this.snelheid;
        }
    }

    wordtGeraakt(speler) {
      if (dist(this.x,this.y,speler.x,speler.y)<50) {
        this.geraakt = true;
      }
      else {
        this.geraakt = false;
      }

      if (this.geraakt == true) {
        speler.health -= 1;
      }
    }
}