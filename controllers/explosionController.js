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

  removeExplosion() {
    log('removeExplosion');
    this.explosions.shift();
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
    verbose('renderExplosions');
    var now = Date.now();
    this.explosions.forEach(explosion => {
      if (!explosion.points) {
        return;
      } else if (now - explosion.startTime > explosionDuration) {
        this.removeExplosion();
        return;
      } else {
        explosion.draw();
      }
    });
  }
}

class Explosion {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.startTime = Date.now();
    this.points = [];
    
    //pick the color to be the shade of red that is 
    // the percentage of the way through the explosion
    this.ratio = rand(0, 100) / 100;
    let maxVelocity = Math.min(window.innerWidth, window.innerHeight) / 100;

    for (let i = 0; i < 75; i++) {
      var dx = rand(-maxVelocity, maxVelocity);
      var dy = rand(-maxVelocity, maxVelocity);
      this.points.push({ x: x, y: y, dx: dx, dy: dy })
    }
  }

  draw() {
    var timeRemaining = Date.now() - this.startTime;
    var remaining = 1 - timeRemaining / explosionDuration;
    var r = Math.ceil(255 * remaining).toString(16).padStart(2, '0');
    var g = Math.ceil(255 * remaining * this.ratio).toString(16).padStart(2, '0');
    var color = '#' + r + g + '00';

    this.points.forEach(point => {
      this.context.save();
      point.x += point.dx;
      point.y += point.dy;
      this.context.fillStyle = color;
      this.context.fillRect(point.x, point.y, 2, 2);
      this.context.restore();
    });
  }
}