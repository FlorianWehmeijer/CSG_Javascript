class Kogel {
    constructor() {
        this.x = Speler.x
        this.y = Speler.y
    }

    teken() {
    fill('black');
    circle(this.x, this.y, 25);
    }
}