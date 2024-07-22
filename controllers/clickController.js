class ClickController {
  constructor (context) {
    this.context = context;
  }
  
  onClick(x, y, args) {
    var fontSize = this.context?.font?.split('px')[0];
    
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      let top = arg.y - fontSize;
      let right = arg.x + this.context.measureText(arg.text).width;
      let bottom = arg.y
      let left = arg.x;

      if (x > left && x < right && y > top && y < bottom) {
        return arg;
      }
    }
  }
}