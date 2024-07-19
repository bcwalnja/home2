log('loaded script.js');
additionControls = document.getElementById('addition-control-container');
startButton = document.getElementById('start-button');
resetButton = document.getElementById('reset-button');
multiplicationControls = document.getElementById('multiplication-control-container');
radioButtons = document.querySelectorAll('input[name="operation"]');
allInputs = document.querySelectorAll('input');
allControlsContainer = document.getElementById('all-controls-container');
canvas = document.getElementById('game-canvas');
game = null;

// by making all the methods lambda functions, 
// they don't have issues with 'this' keyword, 
// 'this' will always refer to the global object
const init = () => {
  startButton.addEventListener('click', onStartClicked);
  resetButton.addEventListener('click', onResetClicked);
  resetButton.disabled = true;

  for (const input of allInputs) {
    input.disabled = false;
  }

  window.addEventListener('resize', resizeCanvas);

  for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', onOperationChange);
  }

  resizeCanvas();
}

const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = window.innerHeight * .95 - canvas.offsetTop;
}

const onOperationChange = () => {
  const selectedOperation = findSelectedOperation();
  log('selected operation:', selectedOperation);
}

const onStartClicked = () => {
  console.log('Start button was clicked!');
  startButton.disabled = true;
  resetButton.disabled = false;
  for (const input of allInputs) {
    input.disabled = true;
  }

  const operation = findSelectedOperation();
  log('selected operation:', operation);

  game = new Game(canvas, 'Player', operation);
  game.startGame();
}

const onResetClicked = () => {
  console.log('Reset button was clicked!');
  startButton.disabled = false;
  resetButton.disabled = true;
  for (const input of allInputs) {
    input.disabled = false;
  }
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