class Kogel {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    beweeg() {
        this.x ++;
    }

    teken() {
    fill('black');
    circle(this.x, this.y, 25);
    }

    wordtGeraakt(zombie) {
        if (dist(this.x, this.y, zombie.x, zombie.y) < 50) {
            return true;
        }
        else {
            return false;
        }
    }
}