class ExplosionController {
  constructor(context) {
    this.context = context;
    this.explosionDuration = 7000;
    this.explosions = [];
  }

  createExplosion(x, y, color) {
    log('creating explosion at:', x, y);
    const explosion = new Explosion(this.context, x, y, color);
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
      } else if (now - explosion.startTime > this.explosionDuration) {
        this.removeExplosion();
        return;
      } else {
        explosion.draw();
      }
    });
  }
}

class Explosion {
  constructor(context, x, y, color) {
    this.explosionDuration = 7000;
    this.context = context;
    this.x = x;
    this.y = y;
    this.startTime = Date.now();
    this.points = [];

    if (!color) {
      this.ratio = rand(0, 100) / 100;
    } else {
      if (color === 'red') {
        this.ratio = 0;
      } else if (color === 'orange') {
        this.ratio = 0.5;
      } else if (color === 'yellow') {
        this.ratio = 1;
      }
    }

    let maxVelocity = Math.min(window.innerWidth, window.innerHeight) / 180;
    var count = 250;
    for (let i = 0; i < count; i++) {
      // add a point that is i / count * 2 * Math.PI radians around the circle
      var angle = i / count * 2 * Math.PI;
      var velocity = maxVelocity;
      var dx = Math.cos(angle) * velocity * Math.random();
      var dy = Math.sin(angle) * velocity * Math.random();
      this.points.push({ x, y, dx, dy });
    }
  }

  draw() {
    var timeRemaining = Date.now() - this.startTime;
    var remaining = 1 - timeRemaining / this.explosionDuration;
    var r = Math.ceil(255 * remaining).toString(16).padStart(2, '0');
    var g = Math.ceil(255 * remaining * this.ratio).toString(16).padStart(2, '0');
    var color = '#' + r + g + '00';

    for (let i = this.points.length - 1; i >= 0; i--) {
      //if point is outside canvas, remove it
      let p = this.points[i];
      if (p.x < 0 || p.x > this.context.canvas.width || p.y < 0 || p.y > this.context.canvas.height) {
        this.points.splice(i, 1);
      } else {
        this.context.save();
        p.x += p.dx;
        p.y += p.dy;
        this.context.fillStyle = color;
        this.context.fillRect(p.x, p.y, 2, 2);
        this.context.restore();
      }
    }
  }
}