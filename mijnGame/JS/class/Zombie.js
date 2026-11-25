class Zombie {
    constructor() {
        this.x = random(50,1150);
        this.y = random(50,750);
        this.snelheid = 0.75;
        this.geraakt = false;
        this.currentTime = null;
        this.laasteKeerDamage = -1000;
        this.damageDelay = 1000;
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
      this.currentTime = millis();
      
      if (dist(this.x,this.y,speler.x,speler.y)<50) {
        this.geraakt = true;
      }
      else {
        this.geraakt = false;
      }

      if (this.geraakt == true) {
        if (this.currentTime - this.laasteKeerDamage > this.damageDelay) {
        speler.health -= 10;
        this.laasteKeerDamage = millis();
        }
      }
    }
}