'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var yourPictureElement = document.querySelector('#upload-file');
  window.form = document.querySelector('.hidden');
  document.querySelector('.effect-level__pin').style.left = '0px';

  yourPictureElement.addEventListener('change', function () {
    window.form.classList.remove('hidden');
  });

  document
    .querySelector('#upload-cancel')
    .addEventListener('click', function () {
      window.form.classList.add('hidden');
    });

  function onFormEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      return window.form.classList.add('hidden');
    }
    return null;
  }

  document.addEventListener('keydown', onFormEscPress);
})();
