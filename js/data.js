'use strict';
(function () {
  var onSuccessAjax = function (dataArr) {
    var postsArray = [];
    postsArray = dataArr.slice(0);
    window.postsArray = postsArray;
    window.renderPosts(dataArr);
    window.zoomPicture();
  };

  var errorTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');

  var onErrorAjax = function () {
    var main = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    main.appendChild(fragment);
  };

  window.getAjaxData(
      'https://js.dump.academy/kekstagram/data',
      onSuccessAjax,
      onErrorAjax
  );
})();
