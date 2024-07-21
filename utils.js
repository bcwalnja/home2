log('loaded utils.js');
/** min and max are both inclusive */
function rand(min, max) {
  verbose('rand');
  if (min == max) {
    return min;
  }
  let mean = (max + min) / 2;
  let range = max - min;
  let seed = Math.random() - 0.5;
  let result = mean + seed * range;
  return Math.round(result);
}

function log(...msg) {
  console.log(...msg);
}

function verbose(...msg) {
  if (this.logVerbose) {
    console.log(...msg);
  }
}

/** adds the class 'hidden' to the element */
function hide(element) {
  verbose('hiding', element);
  element.classList.add('hidden');
}

/** removes the class 'hidden' from the element */
function show(element) {
  verbose('showing', element);
  element.classList.remove('hidden');
}