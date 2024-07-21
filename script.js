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

  //get username and term values from controls
  let username = document.getElementById('name').value;
  let term1min = parseInt(document.getElementById('term-1-min').value);
  let term1max = parseInt(document.getElementById('term-1-max').value);
  let term2min = parseInt(document.getElementById('term-2-min').value);
  let term2max = parseInt(document.getElementById('term-2-max').value);

  game = new Game(canvas, username, operation, term1min, term1max, term2min, term2max);
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