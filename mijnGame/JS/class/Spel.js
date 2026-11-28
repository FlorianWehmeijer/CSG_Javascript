
class Spel {
  constructor() {
    this.wave = null;
    this.score = null;
    this.toestand = null;
    this.speler = new Speler();
    this.aantalZombies = null;
    this.aantalGespawndeZombies = null;
    this.maxAantalZombies = null;
    this.aantalbeginZombies = 1;
    this.aantalBeginMaxZombies = 5;
    this.currentTime = null;
    this.laasteKeerGespawned = -1000;
    this.spawnDelay = 3000;
    this.laatsteSchot = -1000;
    this.schietDelay = 500
    this.waveBerichtStart = 0;
    this.waveBerichtTijd = 2500;
    this.kogelLijst = [];
  }

  nieuwSpel() {
    this.wave = 0;
    this.score = 0;
    this.toestand = 'homescreen';
    this.nieuwWave();
    this.speler.health = 100;
  }

  nieuwWave() {
    this.wave += 1;
    this.zombieLijst = [];
    this.aantalZombies = this.aantalbeginZombies*this.wave;
    this.maxAantalZombies = this.aantalBeginMaxZombies+floor(this.wave*1.2);
    this.aantalGespawndeZombies = this.aantalZombies;
    for (var b = 0;b<this.aantalZombies;b++) {
      this.zombieLijst.push(new Zombie());
    }
    this.waveBerichtStart = millis();

  }
  
  schiet() {
    this.kogelLijst.push(new Kogel(this.speler.x,this.speler.y));
  }

  verwerkInvoer() {
    console.log('key: '+key+'   keyCode: '+keyCode);

    if (this.toestand == 'homescreen') {
      // Spatie
      if (keyCode == 32) {
        this.toestand = 'spelen';
      }
    }

    if (this.toestand == 'spelen') {
      if (key == 'v') {
        this.toestand = 'einde';
      }
    }

    if (this.toestand == 'einde') {
      if (key == 'n') {
        this.nieuwSpel();
      }
    }
  }

  tekenScorebord() {
    push();
    noStroke();
    fill('#EEEEEE');
    rect(0,0,canvas.width,24);
    fill('black');
    textSize(16);
    textAlign(LEFT);
    text('Score: '+this.score + '   Wave '+this.wave,10,20);
    textAlign(RIGHT);
    text(this.speler.health + '/' + this.speler.maxhealth + ' ❤️',canvas.width - 5,17.5);
    pop();
  }

  tekenTekst(x,y,tekst,kleur,grootte) {
    push();
    textStyle(BOLD);
    fill(kleur);
    textSize(grootte);
    textAlign(CENTER,CENTER);
    text(tekst,x,y,canvas.width,canvas.height);
    pop();
  }

  tekenKnop(x,y,breedte,hoogte,tekst) {
    push();
    fill('white');
    rect(x, y, breedte, hoogte);

    fill('black');
    textSize(25);
    textAlign(CENTER, CENTER);
    text(tekst, x+0.5*breedte, y+0.5*hoogte);

    if (mouseIsPressed == true && mouseX > x && mouseX < x+breedte && mouseY > y && mouseY < y+hoogte) {
      this.toestand = toestand;
    }
    pop();
  }

  tekenHomeScreen() {
    background('#fec013');
    this.tekenTekst(0,0,'Klaar voor het spel?\nDruk spatie om te starten','black',20);
    this.tekenKnop(500,300,200,60,'START','spelen');
    this.tekenKnop(1100,700,50,50,'?','hulpmenu');
  }

  tekenHulpMenu() {
    background('#fec013');
    rect(75,75,1050,650);
    this.tekenTekst(0,0,'HULPMENU','black',20);
    this.tekenKnop(100,100,50,50,'↩','homescreen');
  }

  tekenSpeelScherm() {
    background('#38dd5c');
    this.tekenScorebord();
    this.tekenTekst(0,0,'Spel\nDruk V om dood te gaan.','black',20);
  }

  tekenEindScherm() {
    background('#B50016');
    this.tekenTekst(0,0,'Je bent doodgegaan!\nJe score: '+this.score+'.\n\nDruk op n om een nieuw spel te starten','white',20);
    this.tekenKnop(450,50,300,60,'Terug naar startscherm','homescreen');
  }

  teken() {
    this.currentTime = millis();
    if (this.toestand == 'homescreen') {
      this.tekenHomeScreen();
    }
    if (this.toestand == 'hulpmenu') {
      this.tekenHulpMenu();
    }
    if (this.toestand == 'spelen') {
      this.tekenSpeelScherm();
      if (this.currentTime - this.waveBerichtStart < this.waveBerichtTijd) {
        this.tekenTekst(0,-200,'wave ' + this.wave,'black',100);
      }
      for (var b = 0;b<this.zombieLijst.length;b++) {
      this.zombieLijst[b].beweeg(this.speler);
      this.zombieLijst[b].teken();
      this.zombieLijst[b].wordtGeraakt(this.speler);
      }
      if (this.toestand == 'spelen') {
        if (this.aantalGespawndeZombies < this.maxAantalZombies) {
          if (this.currentTime - this.laasteKeerGespawned > this.spawnDelay) {
            this.zombieLijst.push(new Zombie());
            this.aantalZombies ++;
            this.aantalGespawndeZombies ++;
            this.laasteKeerGespawned = millis();
          }
        }
      }
      if (mouseIsPressed == true) {
        if (this.currentTime - this.laatsteSchot > this.schietDelay) {
          this.schiet();
          this.laatsteSchot = millis();
        }
      }
      for (var i = 0; i < this.kogelLijst.length; i++) {
        this.kogelLijst[i].beweeg();
        this.kogelLijst[i].teken();
        for (var j = 0; j < this.zombieLijst.length; j++) {
          if (this.kogelLijst[i].wordtGeraakt(this.zombieLijst[j])) {
            this.zombieLijst.splice(j,1);
            this.kogelLijst.splice(i,1);
            this.aantalZombies --;
          }
        }
      }
      this.speler.beweeg();
      this.speler.teken();
      if (this.speler.health <= 0) {
        this.toestand = 'einde'
      }
      if (this.zombieLijst.length == 0) {
        if (this.aantalGespawndeZombies == this.maxAantalZombies) {
        this.nieuwWave();
        }
      }
    }
    if (this.toestand == 'einde') {
      this.tekenEindScherm();
    }
  }
}
