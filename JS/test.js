class Vierkant {
    // Elk vierkant heeft dezelfde startpositie van x (0) en dezelfde breedte (50).
    constructor(y,snelheid) {
        this.x = 0;
        this.y = y;
        this.breedte = 50;
        this.snelheid = snelheid;
    }
    // Elk vierkant heeft een eigen y en een eigen snelheid

    beweeg() {
        // Verander x op basis van de snelheid
        this.x += 1*this.snelheid;
        if (this.x <= 0 || this.x >= canvas.width - this.breedte) {
            this.snelheid *= -1;
        }
        // Als het vierkant links of rechts de rand raakt, verander de richting
    }

    teken() {
        rect(this.x,this.y,this.breedte);
    }
}

var vierkanten = [];

function setup() {
    canvas = createCanvas(450, 450);
    canvas.parent('processing');

    vierkant1 = new Vierkant(100,1);
    vierkant2 = new Vierkant(200,2);
    vierkant3 = new Vierkant(300,3);
    vierkant4 = new Vierkant(400,4);
    vierkanten.push(vierkant1,vierkant2,vierkant3,vierkant4)
    // Maak drie vierkanten aan: één met y=100,snelheid=1, één met y=200,snelheid=2, en één met y=300,snelheid=3
}

function draw() {
    background('lightblue');

    for (var n = 0; n < vierkanten.length ; n++) {
        vierkanten[n].beweeg();
        vierkanten[n].teken();
    }

    // Teken alle vierkanten (let op: for-loop)
}
