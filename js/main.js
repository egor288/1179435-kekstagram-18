'use strict';
(function () {
  var yourPicture = document.querySelector('#upload-file');
  var form = document.querySelector('.hidden');

  yourPicture.addEventListener('change', function () {
    form.classList.remove('hidden');
  });
})();
