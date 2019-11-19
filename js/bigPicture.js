'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

(function () {
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sliceComments(commentsArr, i) {
    return commentsArr.slice(i, i + 5);
  }

  function addComments(elem2, i) {
    var counter = 0;
    var result = [];
    var userComment = '';

    sliceComments(elem2.comments, i).forEach(function (element) {
      userComment +=
        '<li class="social__comment">' +
        '<img src="img/avatar-' +
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

    result['counter'] = counter;
    result['comments'] = userComment;

    return result;
  }

  function renderBigPicture(elem) {
    window.bigPicture = document.querySelector('.big-picture');
    var photo = window.bigPicture.querySelector('img');
    var likes = document.querySelector('.likes-count');
    var commentsOfPost = document.querySelector('.comments-count');

    var commentsUnderPhoto = document.querySelector('.social__comments');
    var allComments;

    allComments = commentsUnderPhoto.querySelectorAll('li');
    allComments.forEach(function (comment) {
      commentsUnderPhoto.removeChild(comment);
    });

    window.bigPicture.classList.remove('hidden');
    photo.src = elem.url;
    likes.textContent = elem.likes;
    commentsOfPost.textContent = elem.comments.length;
    document.querySelector('#comments-show').textContent = sliceComments(
        elem.comments,
        0
    ).length;

    commentsUnderPhoto.insertAdjacentHTML(
        'beforeEnd',
        addComments(elem, 0)['comments']
    );

    document
      .querySelector('.comments-loader')
      .setAttribute('attr-postid', elem.url);
  }

  function zoomPicture() {
    var picturesContaner = document.querySelector('.pictures');
    var allPictures = picturesContaner.querySelectorAll('.picture__img');

    for (var i = 0; i <= allPictures.length - 1; i++) {
      allPictures[i].addEventListener('click', function (event) {
        var urlOfPost = event.currentTarget.src.substring(
            event.currentTarget.src.indexOf('photo')
        );
        var post = window.postsArray.filter(function (item) {
          return item.url === urlOfPost;
        });
        renderBigPicture(post[0]);
      });

      allPictures[i].parentElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          var urlOfPost = evt.currentTarget
            .querySelector('img')
            .src.substring(
                evt.currentTarget.querySelector('img').src.indexOf('photo')
            );
          var post = window.postsArray.filter(function (item) {
            return item.url === urlOfPost;
          });
          renderBigPicture(post[0]);
        }
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
      window.bigPicture.classList.add('hidden');
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
