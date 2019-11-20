'use strict';
(function () {
  var mainElement = document.querySelector('main');

  var counter = 0;
  var hashtagInputElement = document.querySelector('.text__hashtags');

  function validateSpaceLost(arr) {
    for (var i = 0; i <= arr.length - 1; i++) {
      counter = 0;
      for (var j = 0; j <= arr[i].length - 1; j++) {
        if (arr[i][j] === '#') {
          counter++;
          if (counter > 1) {
            return false;
          }
        }
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
    hashtagInputElement.setCustomValidity('');
    if (hashtagInputElement.value === '') {
      hashtagInputElement.setCustomValidity('');
      return true;
    }

    var hashtags = hashtagInputElement.value;
    var hashtagsArr = hashtags.split(' ');
    if (!validateArray(hashtagsArr)) {
      hashtagInputElement.setCustomValidity('Не верные данные');
      return false;
    }
    hashtagInputElement.setCustomValidity('');
    return true;
  }

  function validateOnSubmit(event) {
    if (validate()) {
      event.preventDefault();
      hashtagInputElement.setCustomValidity('');
      hashtagInputElement.setCustomValidity('');
      return true;
    }
    return false;
  }

  function onSuccessButtonClick() {
    document
      .querySelector('.success__button')
      .removeEventListener('click', onSuccessButtonClick);
    mainElement.removeChild(document.querySelector('.success'));
  }

  function onSuccessSend() {
    var successTemplate = document
      .querySelector('#success')
      .content.querySelector('.success');
    window.form.classList.add('hidden');
    var fragment = document.createDocumentFragment();
    var successElement = successTemplate.cloneNode(true);
    fragment.appendChild(successElement);
    mainElement.appendChild(fragment);
    document
      .querySelector('.success__button')
      .addEventListener('click', onSuccessButtonClick);
  }

  function onErrorButtonClick() {
    mainElement.removeEventListener('click', onErrorButtonClick);
    mainElement.removeChild(document.querySelector('.error'));
  }

  function onErrorSend() {
    var errorTemplate = document
      .querySelector('#error')
      .content.querySelector('.error');
    window.form.classList.add('hidden');
    var fragment = document.createDocumentFragment();
    var errorElement = null;
    errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    mainElement.appendChild(fragment);
    document
      .querySelector('.error__button')
      .addEventListener('click', onErrorButtonClick);
  }

  document
    .querySelector('#upload-submit')
    .addEventListener('click', function (event) {
      event.preventDefault();
      if (validateOnSubmit(event)) {
        window.xmlHttpRequest.sendForm(
            'https://js.dump.academy/kekstagram',
            onSuccessSend,
            onErrorSend
        );
      }
    });

  hashtagInputElement.addEventListener('change', validateOnSubmit);
})();
