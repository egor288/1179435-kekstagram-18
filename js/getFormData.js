'use strict';
(function () {
  var formElement = document.querySelector('#upload-select-image');
  window.getFormData = function () {
    return new FormData(formElement);
  };
})();
