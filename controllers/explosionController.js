class ExplosionController {
    constructor() {
        this.explosions = [];
    }

    createExplosion(x, y) {
        const explosion = new Explosion(x, y);
        this.explosions.push(explosion);
    }

    updateExplosions() {
        this.explosions.forEach((explosion, index) => {
            explosion.update();
            if (explosion.isFinished) {
                this.explosions.splice(index, 1);
            }
        });
    }

    draw() {
        this.updateExplosions();
        this.explosions.forEach(explosion => {
            explosion.draw();
        });
    }
}

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.isFinished = false;
    }

    update() {
        this.size += 1;
        if (this.size > 100) {
            this.isFinished = true;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}