log('loaded script.js');
additionControls = document.getElementById('addition-control-container');
startButton = document.getElementById('start-button');
resetButton = document.getElementById('reset-button');
multiplicationControls = document.getElementById('multiplication-control-container');
radioButtons = document.querySelectorAll('input[name="operation"]');
allControlsContainer = document.getElementById('all-controls-container');
canvas = document.getElementById('game-canvas');
game = null;

const init = () => {
  this.startButton.addEventListener('click', onStartClicked);
  this.resetButton.addEventListener('click', onResetClicked);
  resetButton.disabled = true;

  window.addEventListener('resize', resizeCanvas);

  for (const radioButton of this.radioButtons) {
    radioButton.addEventListener('change', onOperationChange);
  }

  resizeCanvas();
}

const resizeCanvas = () => {
  this.canvas.width = this.canvas.parentElement.clientWidth;
  this.canvas.height = window.innerHeight * .95 - this.canvas.offsetTop;
}

const onOperationChange = () => {
  const selectedOperation = findSelectedOperation();
  log('selected operation:', selectedOperation);
}

const onStartClicked = () => {
  console.log('Start button was clicked!');
  startButton.disabled = true;
  resetButton.disabled = false;

  const operation = findSelectedOperation();
  log('selected operation:', operation);

  game = new Game(canvas, 'Player', operation);
  game.startGame();
}

const onResetClicked = () => {
  console.log('Reset button was clicked!');
  startButton.disabled = false;
  resetButton.disabled = true;
  game?.dispose();
}

const findSelectedOperation = () => {
  for (const operation of radioButtons) {
    if (operation.checked) {
      return operation.value;
    }
  }
}

init();