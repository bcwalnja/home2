class ClickController {
  onClick(canvas, clickArgs, ...args) {
    // for each click event, we will check the xy coordinates of the click
    // and then check each arg to see if the click is within the bounds of the arg
    // given the arg's x, y, and text properties

    let { x, y } = clickArgs;
    for (let arg of args) {
      //the xy is the bottom left corner of the text
      let top = canvas.fillText(arg.text, arg.x, arg.y);
      let right = left + canvas.measureText(arg.text).width;
      if (x > left && x < right && y > top && y < bottom) {
        return arg.text;
      }
    }
  }
}