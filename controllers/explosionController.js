class ExplosionController {
    constructor(context) {
        this.context = context;
        this.explosions = [];
    }

    createExplosion(x, y) {
        log('creating explosion at:', x, y);
        const explosion = new Explosion(this.context, x, y);
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

    renderExplosions() {
        this.updateExplosions();
        this.explosions.forEach(explosion => {
            explosion.draw();
        });
    }
}

class Explosion {
    constructor(context, x, y) {
        this.context = context;
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
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.strokeStyle = 'red';
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
    }
}