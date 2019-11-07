"use strict";
var WIDTH_OF_SLIDER = 495;
var previewImg = document.querySelector(".img-upload__preview");
var sligerAria = document.querySelector(".img-upload__effect-level ");
var oldposX, oldleft, selectedFilter;

console.log(sligerAria);

function pxToNumber(styleLeft) {
  return parseInt(styleLeft.substr(0, styleLeft.length - 2));
}

var moveListener = function(event) {
  var newpos = event.clientX + pxToNumber(oldleft) - oldposX; // - oldpos;

  if (newpos < 0) {
    newpos = 0;
  }

  if (newpos > 453) {
    newpos = 453;
  }

  deepOfEffect.style.left = newpos + "px";

  previewImg.style.filter = changeFilter(selectedFilter, newpos);
};

var deepOfEffect = document.querySelector(".effect-level__pin");
deepOfEffect.style.left = "19px";

deepOfEffect.addEventListener("mousedown", function(event) {
  oldposX = event.clientX;
  oldleft = deepOfEffect.style.left;
  selectedFilter = getInputWithValue();
  document.addEventListener("mousemove", moveListener, false);
});

document.addEventListener("mouseup", function() {
  document.removeEventListener("mousemove", moveListener, false);
});

function getInputWithValue() {
  var inputs = document.querySelectorAll(".effects__radio");
  var i = inputs.length;
  while (i--) {
    if (inputs[i].checked === true) {
      return inputs[i].id;
    }
  }
  return null;
}

function changeFilter(filterValue, sliderLeft) {
  if (filterValue === "effect-none") {
    return "";
  } else if (filterValue === "effect-chrome") {
    return filterChrome(sliderLeft);
  } else if (filterValue === "effect-sepia") {
    return filterSepia(sliderLeft);
  } else if (filterValue === "effect-marvin") {
    return filterMarvin(sliderLeft);
  } else if (filterValue === "effect-phobos") {
    return filterBlur(sliderLeft);
  } else if (filterValue === "effect-heat") {
    return filterBritness(sliderLeft);
  }
  return null;
}

function filterChrome(sliderLeft) {
  return "grayscale(" + (sliderLeft / 453).toString() + ")";
}

function filterSepia(sliderLeft) {
  return "sepia(" + (sliderLeft / 453).toString() + ")";
}

function filterMarvin(sliderLeft) {
  return "invert(" + Math.round((sliderLeft / 453) * 100).toString() + "%)";
}

function filterBlur(sliderLeft) {
  return "blur(" + ((sliderLeft / 453) * 3).toString() + "px)";
}

function filterBritness(sliderLeft) {
  return "brightness(" + ((sliderLeft / 453) * 2 + 1).toString() + ")";
}
