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

  addMissile(source, obj, isCorrectAnswer) {
    const { text, x, y } = source;
    const { x: targetX, y: targetY, dx: targetdX, dy: targetdY } = obj;
    let target = {};
    target.x = targetX + targetdX * 100;
    target.y = targetY + targetdY * 100;
    log('adding missile:', text, x, y, target.x, target.y);
    
    const missile = new Missile()
    missile.text = text
    missile.x = x
    missile.y = y
    const gravity = .05;
    const frames = 100;
    
    // calculate the vertical motion without regard to the horizontal motion
    let verticalDistance = y - target.y;
    let v0y = (verticalDistance + (0.5 * gravity * frames * frames)) / frames;
    let v0x = (target.x - x) / frames;

    missile.dx = v0x;
    missile.dy = -v0y;

    if (!isCorrectAnswer) {
      let r = Math.random() - 0.5;
      let r2 = this.context.canvas.height * 0.005;
      if (r > 0) {
        missile.dx += r + r2;
      } else {
        missile.dx += r - r2;
      }
    }

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
  
      if (x.y > this.context.canvas.height) {
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

  drawMissileEmoji(missile) {
    this.context.save(); // Save the current this.context state
    this.context.translate(missile.x, missile.y); // Translate to the missile's position
    this.context.rotate(-45 * Math.PI / 180); // Rotate 45 degrees to the left
    this.context.fillText('\u{1F680}', 0, 0); // Draw the emoji at the translated and rotated position
    this.context.restore(); // Restore the this.context to its original state
  }
}