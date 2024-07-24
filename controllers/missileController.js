log('loaded missileController.js');
class Missile {
  text
  x
  y
  dx
  dy
  a
}

class MissileController {
  constructor(context) {
    log('MissileController instantiated');
    this.context = context;
    this.padding = canvas.height * .02;
  }
  
  context
  padding
  missiles = []

  addMissile(source, target) {
    const { text, x, y } = source;
    const { x: targetX, y: targetY, dx: targetdX, dy: targetdY } = target;
    log('adding missile:', text, x, y, targetX, targetY);
    
    const missile = new Missile()
    missile.text = text
    missile.x = x
    missile.y = y
    
    // target point [100 frames from now] (targetX + dx * 100, targetY + dy * 100)
    // const dx = (targetX - x + targetdX * 100) / 100;
    // const dy = (targetY - y + targetdY * 100) / 100;

    // those values would be right if no gravity was applied
    // how much time does it take to reach the target? 100 frames, each frame is 16ms
    const gravity = .05; //TODO: fix this
    const t = 100 * 5;
    const dx = (targetX - x - targetdX * t) / t;
    const dy = (targetY - y - targetdY * t) / t + 0.5 * gravity * t;

    missile.dx = dx;
    missile.dy = -dy;
    missile.a = gravity;
    this.missiles.push(missile);
  }

  removeMissile() {
    if (this.missiles?.length) {
      this.missiles.shift();
    }
  }

  renderMissiles() {
    for (const x of this.missiles) {
      if (x.dx || x.dy) {
        x.x += x.dx;
        x.y += x.dy; // Invert the y-axis by subtracting dy instead of adding it
      }
  
      if (x.x < 0 || x.x > this.context.canvas.width || x.y < 0 || x.y > this.context.canvas.height) {
        log('removing missile:', x);
        this.missiles.splice(this.missiles.indexOf(x), 1);
      } else {
        this.context.fillText(x.text, x.x, x.y);
        x.dy += x.a; // add the gravity acceleration to the missile's vertical velocity
      }
      
      // I used the following code to render a missile
      // this.context.save(); // Save the current this.context state
      // this.context.translate(x.x, x.y); // Translate to the missile's position
      // this.context.rotate(-45 * Math.PI / 180); // Rotate 45 degrees to the left
      // this.context.fillText('\u{1F680}', 0, 0); // Draw the emoji at the translated and rotated position
      // this.context.restore(); // Restore the this.context to its original state
    }
  }
}