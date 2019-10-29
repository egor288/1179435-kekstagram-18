'use strict';
var WIDTH_OF_SLIDER = 495;
var previewImg = document.querySelector('.img-upload__preview');
var moveListener = function (event) {
  deepOfEffect.style.left = event.clientX - 240 + 'px';
};

var deepOfEffect = document.querySelector('.effect-level__pin');

deepOfEffect.addEventListener('mousedown', function () {
  document.addEventListener('mousemove', moveListener, false);
});

document.addEventListener('mouseup', function () {
  var filter = getInputWithValue();
  previewImg.style.filter = changeFilter(filter, 1);
  document.removeEventListener('mousemove', moveListener, false);
});

function getInputWithValue() {
  var inputs = document.querySelectorAll('.effects__radio');
  var i = inputs.length;
  while (i--) {
    if (inputs[i].checked === true) {
      return inputs[i].id;
    }
  }
  return null;
}

function changeFilter(filterValue, leftOfSlider) {
  if (filterValue === 'effect-none') {
    return '';
  } else if (filterValue === 'effect-chrome') {
    return 'grayscale(' + leftOfSlider + ')';
  } else if (filterValue === 'effect-sepia') {
    return 'sepia(' + leftOfSlider + ')';
  } else if (filterValue === 'effect-marvin') {
    return 'invert(' + parseInt(leftOfSlider * 70, 10) + '%)';
  } else if (filterValue === 'effect-phobos') {
    return 'blur(' + leftOfSlider * 3 + 'px)';
  } else if (filterValue === 'effect-heat') {
    return 'brightness(' + leftOfSlider + ')';
  }
  return null;
}
