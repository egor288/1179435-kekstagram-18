'use strict';
(function () {
  function onSuccessAjax(dataArr) {
    var postsArray = [];
    postsArray = dataArr.slice(0);
    window.postsArray = postsArray;
    window.renderPosts(dataArr);
  }

  var errorTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');

  function onErrorAjax() {
    var mainElement = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    mainElement.appendChild(fragment);

    function onTryAgainClick() {
      document
        .querySelector('.error__button')
        .removeEventListener('click', onTryAgainClick);
      mainElement.removeChild(document.querySelector('.error'));
    }

    document
      .querySelector('.error__button')
      .addEventListener('click', onTryAgainClick);
  }

  window.xmlHttpRequest.getAjaxData(
      'https://js.dump.academy/kekstagram/data',
      onSuccessAjax,
      onErrorAjax
  );
})();
