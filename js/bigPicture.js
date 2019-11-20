'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var bigPictureElement;

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sliceComments(commentsArr, i) {
    return commentsArr.slice(i, i + 5);
  }

  function addComments(elem2, i) {
    var counter = 0;
    var results = [];
    var userComment = '';

    sliceComments(elem2.comments, i).forEach(function (element) {
      userComment +=
        '<li class="social__comment">' +
        '<img class="social__picture" src="img/avatar-' +
        getRandomInRange(1, 6) +
        '.svg" alt="' +
        element.name +
        '" width="35" height="35">' +
        '<p class="social__text">' +
        element.message +
        '</p>' +
        '</li>';
      counter++;
    });

    results['counter'] = counter;
    results['comments'] = userComment;

    return results;
  }

  function renderBigPicture(elem) {
    bigPictureElement = document.querySelector('.big-picture');
    var photoElement = bigPictureElement.querySelector('img');
    var likesElement = document.querySelector('.likes-count');
    var commentsOfPostElement = document.querySelector('.comments-count');

    var commentsUnderPhotoElement = document.querySelector('.social__comments');
    var allComments;

    allComments = commentsUnderPhotoElement.querySelectorAll('li');
    allComments.forEach(function (comment) {
      commentsUnderPhotoElement.removeChild(comment);
    });

    bigPictureElement.classList.remove('hidden');
    photoElement.src = elem.url;
    likesElement.textContent = elem.likes;
    commentsOfPostElement.textContent = elem.comments.length;
    document.querySelector('#comments-show').textContent = sliceComments(
        elem.comments,
        0
    ).length;

    commentsUnderPhotoElement.insertAdjacentHTML(
        'beforeEnd',
        addComments(elem, 0)['comments']
    );

    document
      .querySelector('.comments-loader')
      .setAttribute('attr-postid', elem.url);
  }

  function zoomPicture() {
    var picturesContanerElement = document.querySelector('.pictures');
    var allPicturesElement = picturesContanerElement.querySelectorAll(
        '.picture__img'
    );

    allPicturesElement.forEach(function (element) {
      element.addEventListener('click', function (event) {
        var urlOfPost = event.currentTarget.src.substring(
            event.currentTarget.src.indexOf('photo')
        );

        var post = returnPostByUrl(urlOfPost);
        renderBigPicture(post[0]);
      });

      element.parentElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          var urlOfPost = evt.currentTarget
            .querySelector('img')
            .src.substring(
                evt.currentTarget.querySelector('img').src.indexOf('photo')
            );
          var post = returnPostByUrl(urlOfPost);
          renderBigPicture(post[0]);
        }
      });
    });

    function returnPostByUrl(urlOfPost) {
      return window.postsArray.filter(function (item) {
        return item.url === urlOfPost;
      });
    }

    var cancelZoom = document.querySelector('#picture-cancel');

    function onPopupEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        return closePopup();
      }
      return null;
    }

    cancelZoom.addEventListener('click', function () {
      return closePopup();
    });

    cancelZoom.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        return closePopup();
      }
      return null;
    });

    function closePopup() {
      bigPictureElement.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  }

  document
    .querySelector('.comments-loader')
    .addEventListener('click', function (event) {
      var result;

      if (
        parseInt(document.querySelector('#comments-show').textContent, 10) <
        parseInt(document.querySelector('.comments-count').textContent, 10)
      ) {
        var urlOfPost = event.currentTarget.getAttribute('attr-postid');

        var elem = window.postsArray.filter(function (item) {
          return item.url === urlOfPost;
        });

        result = addComments(
            elem[0],
            parseInt(document.querySelector('#comments-show').textContent, 10)
        );

        var oldCounter = parseInt(
            document.querySelector('#comments-show').textContent,
            10
        );

        document.querySelector('#comments-show').textContent =
          oldCounter + result['counter'];

        document
          .querySelector('.social__comments')
          .insertAdjacentHTML('beforeEnd', result['comments']);
      }
    });

  window.zoomPicture = zoomPicture;
})();
