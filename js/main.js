'use strict';
(function () {
  var yourPicture = document.querySelector('#upload-file');
  window.form = document.querySelector('.hidden');
  document.querySelector('.effect-level__pin').style.left = '0px';

  yourPicture.addEventListener('change', function () {
    window.form.classList.remove('hidden');
  });
  document
    .querySelector('#upload-cancel')
    .addEventListener('click', function () {
      window.form.classList.add('hidden');
    });
})();
