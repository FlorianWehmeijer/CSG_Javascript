
class Spel {
  constructor() {
    this.level = null;
    this.score = null;
    this.toestand = null;
    this.speler = new Speler();
  }

  nieuwSpel() {
    this.wave = 1;
    this.score = 0;
    this.toestand = 'homescreen';
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
    text('Score: '+this.score,10,20);
    textAlign(RIGHT);
    text('❤ ❤ ❤ ❤ ❤',canvas.width - 10,20);
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

  tekenHomeScreen() {
    background('#fec013');
    this.tekenTekst('Klaar voor het spel?\nDruk spatie om te starten','black');
  }

  // tekenStartScherm() {
  //   background('#ba087d');
  //   this.tekenScorebord();
  //   this.tekenTekst('Klaar om te spelen?\nDruk spatie om te starten','white');
  // }

  tekenSpeelScherm() {
    background('#38dd5c');
    this.tekenScorebord();
    this.tekenTekst('Spel\nDruk V om dood te gaan.','black');
  }

  tekenEindScherm() {
    background('#B50016');
    this.tekenTekst('Je bent doodgegaan!\nJe score: '+this.score+'.\n\nDruk op n om een nieuw spel te starten','white');
  }

  teken() {
    if (this.toestand == 'homescreen') {
      this.tekenHomeScreen();
    }

    if (this.toestand == 'spelen') {
      this.tekenSpeelScherm();
      this.speler.beweeg();
      this.speler.teken();
    }

    if (this.toestand == 'einde') {
      this.tekenEindScherm();
    }
  }
}