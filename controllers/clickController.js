class ClickController {
  constructor(context) {
    this.context = context;

    this.xPadding = this.context.canvas.width * .01;
    this.yPadding = this.context.canvas.height * .01;
  }

  onClick(x, y, args) {
    var fontSize = parseFloat(this.context?.font?.split('px')[0]) || 16;

    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      this.context.beginPath();
      log('path:', arg.x - this.xPadding, arg.y - fontSize - this.yPadding, this.context.measureText(arg.text).width + 2 * this.xPadding, fontSize + 2 * this.yPadding);
      this.context.rect(
        arg.x - this.xPadding,
        arg.y - fontSize - this.yPadding,
        this.context.measureText(arg.text).width + 2 * this.xPadding,
        fontSize + 2 * this.yPadding);
      this.context.fill();
      log('this.context.isPointInPath(x, y): ', this.context.isPointInPath(x, y));
      if (this.context.isPointInPath(x, y)) {
        return arg;
      }
    }
  }
}