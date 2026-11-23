class Zombie {
    constructor() {
        this.x = random(50,600);
        this.y = random(50,600);
    }

    teken() {
        fill('green');
        circle(this.x, this.y, 50);
    }

    beweeg() {
        this.x += random(-1,1);
        this.y += random(-1,1);
    }
}