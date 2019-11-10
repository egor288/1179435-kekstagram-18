'use strict';
(function () {
  var counter = 0;
  var hashtagInput = document.querySelector('.text__hashtags');

  // reportValidity()
  function validateSpaceLost(arr) {
    for (var i = 0; i <= arr.length - 1; i++) {
      counter = 0;
      for (var j = 0; j <= arr[i].length - 1; j++) {
        if (arr[i][j] === '#') {
          counter++;
        }
      }

      if (counter > 1) {
        return false;
      }
    }

    return true;
  }

  function validateHashtag(arr) {
    for (var i = 0; i <= arr.length - 1; i++) {
      // максимальная длина одного хэш-тега 20 символов, включая решётку
      // хеш-тег не может состоять только из одной решётки
      // хэш-тег начинается с символа # (решётка)
      if (arr[i].length > 20 || arr[i] === '#' || arr[i][0] !== '#') {
        return false;
      }

      for (var j = 0; j <= arr.length - 1; j++) {
        // один и тот же хэш-тег не может быть использован дважды
        if (arr[i].toLowerCase() === arr[j].toLowerCase()) {
          if (i !== j) {
            return false;
          }
        }
      }
    }

    return true;
  }

  // Функция возвращает false если массив не прошел валидацию
  function validateArray(arr) {
    // нельзя указать больше пяти хэш-тегов
    if (arr.length > 5) {
      return false;
    }

    // хэш-теги разделяются пробелами
    if (!validateSpaceLost(arr)) {
      return false;
    }
    if (!validateHashtag(arr)) {
      return false;
    }
    return true;
  }
  // Метод, проверяющий валидность

  function validate() {
    hashtagInput.setCustomValidity('');
    if (hashtagInput.value === '') {
      hashtagInput.setCustomValidity('');
      return true;
    }

    var hashtags = hashtagInput.value;
    var hashtagsArr = hashtags.split('');
    if (!validateArray(hashtagsArr)) {
      hashtagInput.setCustomValidity('Не верные данные');
      return false;
    }
    hashtagInput.setCustomValidity('');
    return true;
  }
  var uploadForm = document.querySelector('#upload-select-image');

  function validateOnSubmit(event) {
    event.preventDefault();
    if (validate()) {
      hashtagInput.setCustomValidity('');
      uploadForm.submit();
    }
  }

  uploadForm.addEventListener('submit', validateOnSubmit);
})();
