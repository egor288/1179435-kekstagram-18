'use strict';
(function () {
  var previewImgElement = document.querySelector('.img-upload__preview');
  var oldposX;
  var oldleft;
  var selectedFilter;
  var zoomBigElement = document.querySelector('.scale__control--bigger');
  var zoomSmallElement = document.querySelector('.scale__control--smaller');
  var zoomValueElement = document.querySelector('.scale__control--value');
  zoomValueElement.value = 100 + '%';

  zoomBigElement.addEventListener('click', onZoomPlusClick);
  zoomSmallElement.addEventListener('click', onZoomMinusClick);

  function convertValueToNum(str) {
    return parseInt(str.substr(0, str.length - 1), 10);
  }

  function onZoomPlusClick() {
    var zoomButton = document.querySelector('.scale__control--value');
    zoomValueElement = convertValueToNum(zoomButton.value);
    if (zoomValueElement < 100) {
      var newValue = zoomValueElement + 25;
      zoomButton.value = newValue.toString() + '%';
      document.querySelector('.img-upload__preview').style =
        'transform: scale(' + (newValue / 100).toString() + ')';
    }
  }

  function onZoomMinusClick() {
    var zoomButton = document.querySelector('.scale__control--value');
    zoomValueElement = convertValueToNum(zoomButton.value);
    if (zoomValueElement > 25) {
      var newValue = zoomValueElement - 25;
      zoomButton.value = newValue.toString() + '%';
      document.querySelector('.img-upload__preview').style =
        'transform: scale(' + (newValue / 100).toString() + ')';
    }
  }

  function convertPxToNumber(styleLeft) {
    return parseInt(styleLeft.substr(0, styleLeft.length - 2), 10);
  }

  var moveListener = function (event) {
    var newpos = event.clientX + convertPxToNumber(oldleft) - oldposX; // - oldpos;

    if (newpos < 0) {
      newpos = 0;
    }

    if (newpos > 453) {
      newpos = 453;
    }

    deepOfEffect.style.left = newpos + 'px';

    previewImgElement.style.filter = changeFilter(selectedFilter, newpos);
  };

  var deepOfEffect = document.querySelector('.effect-level__pin');
  deepOfEffect.style.left = '0px';

  deepOfEffect.addEventListener('mousedown', function (event) {
    oldposX = event.clientX;
    oldleft = deepOfEffect.style.left;
    selectedFilter = getInputWithValue();
    document.addEventListener('mousemove', moveListener, false);
  });

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', moveListener, false);
  });

  function getInputWithValue() {
    var inputs = document.querySelectorAll('.effects__radio');
    var i = inputs.length;
    while (i--) {
      if (inputs[i].checked) {
        return inputs[i].id;
      }
    }
    return null;
  }

  function changeFilter(filterValue, sliderLeft) {
    if (filterValue === 'effect-none') {
      return '';
    } else if (filterValue === 'effect-chrome') {
      return changeFilterChrome(sliderLeft);
    } else if (filterValue === 'effect-sepia') {
      return changeFilterSepia(sliderLeft);
    } else if (filterValue === 'effect-marvin') {
      return changeFilterMarvin(sliderLeft);
    } else if (filterValue === 'effect-phobos') {
      return changeFilterBlur(sliderLeft);
    } else if (filterValue === 'effect-heat') {
      return changeFilterBritness(sliderLeft);
    }
    return null;
  }

  function changeFilterChrome(sliderLeft) {
    return 'grayscale(' + (sliderLeft / 453).toString() + ')';
  }

  function changeFilterSepia(sliderLeft) {
    return 'sepia(' + (sliderLeft / 453).toString() + ')';
  }

  function changeFilterMarvin(sliderLeft) {
    return 'invert(' + Math.round((sliderLeft / 453) * 100).toString() + '%)';
  }

  function changeFilterBlur(sliderLeft) {
    return 'blur(' + ((sliderLeft / 453) * 3).toString() + 'px)';
  }

  function changeFilterBritness(sliderLeft) {
    return 'brightness(' + ((sliderLeft / 453) * 2 + 1).toString() + ')';
  }

  window.getInputWithValue = getInputWithValue;
})();
