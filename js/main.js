'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var yourPictureElement = document.querySelector('#upload-file');
  window.form = document.querySelector('.img-upload__overlay');
  var deepOfEffect = document.querySelector('.effect-level__pin');
  var zoomBigElement = document.querySelector('.scale__control--bigger');
  var zoomSmallElement = document.querySelector('.scale__control--smaller');

  function closeImgPreview() {
    window.form.classList.add('hidden');
    removeEventListeners();
  }

  yourPictureElement.addEventListener('change', function () {
    document.querySelector('.effect-level').classList.add('hidden');

    document
      .querySelector('#upload-cancel')
      .addEventListener('click', closeImgPreview);

    window.form.classList.remove('hidden');

    document.addEventListener('keydown', onFormEscPress);

    deepOfEffect.addEventListener(
        'mousedown',
        window.filters.onSliderMousedown
    );

    document.addEventListener('mouseup', window.filters.onSliderMouseup);

    zoomBigElement.addEventListener('click', window.filters.onZoomPlusClick);

    zoomSmallElement.addEventListener('click', window.filters.onZoomMinusClick);

    document.querySelectorAll('[name="effect"]').forEach(function (elem) {
      elem.addEventListener('change', window.filters.onFilterChange);
    });
  });

  function removeEventListeners() {
    document
      .querySelector('#upload-cancel')
      .removeEventListener('click', closeImgPreview);

    document.removeEventListener('keydown', onFormEscPress);

    deepOfEffect.removeEventListener(
        'mousedown',
        window.filters.onSliderMousedown
    );

    document.removeEventListener('mouseup', window.filters.onSliderMouseup);

    zoomBigElement.removeEventListener('click', window.filters.onZoomPlusClick);

    zoomSmallElement.removeEventListener(
        'click',
        window.filters.onZoomMinusClick
    );

    document.querySelectorAll('[name="effect"]').forEach(function (elem) {
      elem.removeEventListener('change', window.filters.onFilterChange);
    });
  }

  function onFormEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.form.classList.add('hidden');
      removeEventListeners();
    }
  }
})();
