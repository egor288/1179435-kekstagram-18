'use strict';
(function () {
  var form = document.querySelector('#upload-select-image');
  window.getFormData = function () {
    return new FormData(form);
  };
})();
