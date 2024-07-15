log('loaded missileController.js');
class Missile {
  text
  x
  y
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

  addMissile({ text, x, y }) {
    const missile = new Missile()
    missile.text = text
    missile.x = x
    missile.y = y
    this.missiles.push(missile)
  }

  renderMissiles() {
    for (const x of this.missiles) {
      if (x.dx) {
        x.x += x.dx;
        x.y += x.dy;
      }
      
      this.context.fillText(x.text, x.x + padding * 2, x.y);
      this.context.save(); // Save the current this.context state
      this.context.translate(x.x, x.y); // Translate to the missile's position
      this.context.rotate(-45 * Math.PI / 180); // Rotate 45 degrees to the left
      this.context.fillText('\u{1F680}', 0, 0); // Draw the emoji at the translated and rotated position
      this.context.restore(); // Restore the this.context to its original state
    }
  }
}