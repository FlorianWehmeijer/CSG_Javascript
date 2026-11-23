
class Spel {
  constructor() {
    this.wave = null;
    this.score = null;
    this.toestand = null;
    this.speler = new Speler();
    this.aantalZombies = 5;
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
    for (var b = 0;b<this.aantalZombies;b++) {
      this.zombieLijst.push(new Zombie());
    }
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

    if (this.toestand == 'spelen') {
      if (keyCode == 32) {
        this.zombieLijst.push(new Zombie());
        this.aantalZombies ++;
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
    text('Score: '+this.score,10,20);
    textAlign(RIGHT);
    text(this.speler.health + '/' + this.speler.maxhealth + ' ❤️',canvas.width - 5,17.5);
    pop();
  }

  tekenTekst(tekst,kleur) {
    push();
    textStyle(BOLD);
    fill(kleur);
    textSize(20);
    textAlign(CENTER,CENTER);
    text(tekst,0,0,canvas.width,canvas.height);
    pop();
  }

  tekenKnop(x,y,breedte,hoogte,tekst,toestand) {
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
    this.tekenTekst('Klaar voor het spel?\nDruk spatie om te starten','black');
    this.tekenKnop(500,300,200,60,'START','spelen');
    this.tekenKnop(1100,700,50,50,'?','hulpmenu');
  }

  tekenHulpMenu() {
    background('#fec013');
    rect(75,75,1050,650);
    this.tekenTekst('HULPMENU','black');
    this.tekenKnop(100,100,50,50,'↩','homescreen');
  }

  tekenSpeelScherm() {
    background('#38dd5c');
    this.tekenScorebord();
    this.tekenTekst('Spel\nDruk V om dood te gaan.','black');
  }

  tekenEindScherm() {
    background('#B50016');
    this.tekenTekst('Je bent doodgegaan!\nJe score: '+this.score+'.\n\nDruk op n om een nieuw spel te starten','white');
    this.tekenKnop(450,50,300,60,'Terug naar startscherm','homescreen');
  }

  teken() {
    if (this.toestand == 'homescreen') {
      this.tekenHomeScreen();
    }
    if (this.toestand == 'hulpmenu') {
      this.tekenHulpMenu();
    }
    if (this.toestand == 'spelen') {
      this.tekenSpeelScherm();
      for (var b = 0;b<this.aantalZombies;b++) {
      this.zombieLijst[b].beweeg(this.speler);
      this.zombieLijst[b].teken();
      this.zombieLijst[b].wordtGeraakt(this.speler);
      }
      this.speler.beweeg();
      this.speler.teken();
      if (this.speler.health < 0) {
        this.toestand = 'einde'
      }
    }
    if (this.toestand == 'einde') {
      this.tekenEindScherm();
    }
  }
}
