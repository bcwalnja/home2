class KeyboardController {
  constructor(context) {
    this.context = context;
    this.fontSize = Math.floor(this.context.canvas.height / 20);
    this.text = '';
    this.x = this.context.canvas.width / 2;
    this.y = this.context.canvas.height - this.fontSize;
    this.emitAnswer = (text, x, y) => { };
  }

  handleKeyPress = (event) => {
    if (event.key >= '0' && event.key <= '9') {
      this.text += event.key;
    } else if (event.key === 'Backspace') {
      this.text = this.text.slice(0, -1);
    } else if ((event.key === 'Enter' || event.key === 'NumpadEnter') && this.text.length > 0) {
      log('answer:', this.text);
      this.emitAnswer(this.text, this.x, this.y);
      this.text = '';
    }
  }

  // draw the answer string to the screen
  renderText() {
    this.context.save();
    this.context.align = 'center';
    this.context.canvas.textBaseline = 'bottom';
    this.context.fillText(this.text, this.x, this.y);
    this.context.restore();
  }
}