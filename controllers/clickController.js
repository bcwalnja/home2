class ClickController {
  onClick(canvas, clickArgs, ...args) {
    let { x, y } = clickArgs;
    for (let arg of args) {
      let top = canvas.fillText(arg.text, arg.x, arg.y);
      let right = left + canvas.measureText(arg.text).width;
      if (x > left && x < right && y > top && y < bottom) {
        return arg;
      }
    }
  }
}