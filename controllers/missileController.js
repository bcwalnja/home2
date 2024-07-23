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

  addMissile(source, target) {
    const { text, x, y } = source;
    const { x: targetX, y: targetY } = target;
    log('adding missile:', text, x, y, targetX, targetY);

    const missile = new Missile()
    missile.text = text
    missile.x = x
    missile.y = y
    // TODO: decide on the physics of the environment, 
    // and then calculate the dx and dy values
    
    // temporary values:
    missile.dx = (targetX - x) / 100
    missile.dy = (targetY - y) / 100
    
    this.missiles.push(missile)
  }

  renderMissiles() {
    for (const x of this.missiles) {
      if (x.dx) {
        x.x += x.dx;
        x.y += x.dy;
      }

      if (x.x < 0 || x.x > this.context.canvas.width || x.y < 0 || x.y > this.context.canvas.height) {
        log('removing missile:', x);
        this.missiles.splice(this.missiles.indexOf(x), 1);
      }
      
      this.context.fillText(x.text, x.x, x.y);
      // I used the following code to render a missile
      // this.context.save(); // Save the current this.context state
      // this.context.translate(x.x, x.y); // Translate to the missile's position
      // this.context.rotate(-45 * Math.PI / 180); // Rotate 45 degrees to the left
      // this.context.fillText('\u{1F680}', 0, 0); // Draw the emoji at the translated and rotated position
      // this.context.restore(); // Restore the this.context to its original state
    }
  }
}