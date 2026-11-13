class Spel {
  constructor() {
    this.level = null;
    this.score = null;
    this.toestand = null;
  }

  nieuwSpel() {
    this.level = 1;
    this.score = 0;
    this.toestand = 'begin';
  }

  verwerkInvoer() {
    console.log('key: '+key+'   keyCode: '+keyCode);
    // hier komt de code die bepaalt wat er gebeurt als je een toets indrukt
    if (this.toestand == 'begin' || this.toestand == 'levelGehaald') {
      if (keyCode == 32) {
        this.toestand = 'spelen'
      }
    }
    if (this.toestand == 'spelen') {
      if (keyCode == 86) {
        this.toestand = 'levelGehaald'
      }
    }
    // if (this.toestand == 'spelen') {
    //   if (keyCode == 87) {
        groenwinscherm
    //   }
    // }
    // if (this.toestand == 'spelen') {
    //   if (keyCode == 76) {
        roodverliesersscherm
    //   }
    // }
    // if (this.toestand == 'spelen') {
    //   if (keyCode == 78) {
        nieuwspel
    //   }
    // }
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

  tekenBeginScherm() {
    background('#e4510e');
    this.tekenTekst('Klaar voor het spel?\nDruk spatie om te starten','black');
  }

  tekenSpeelScherm() {
    background('#2a7fe0');
    this.tekenScorebord();
    this.tekenTekst('Dit is level ' + this.level + '. \nDruk op v om naar het volgende level te gaan','black');
  }

  tekenLevelScherm() {
    background('#7adb6e');
    this.tekenScorebord();
    this.tekenTekst('Klaar voor het volgende level?\nDruk Spatie om te starten','black');
  }

  tekenScorebord() {
    textSize(15);
    color('#acacac');
    rect(0,0,450,25);
    text('Score: '+ this.score,20,17.5);
    text('❤️❤️❤️❤️❤️',330,17.5);
  }

  tekenWinScherm() {

  }

  tekenVerliesScherm() {
    
  }

  teken() {
    if (this.toestand == 'begin') {
      this.tekenBeginScherm();
    }
    if (this.toestand == 'spelen') {
      this.tekenSpeelScherm();
    }
    if (this.toestand == 'levelGehaald') {
      this.score += 5;
      this.level += 1;
      this.tekenLevelScherm();
    }
  }
}