'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

(function () {
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function renderBigPicture(elem) {
    window.bigPicture = document.querySelector('.big-picture');
    var photo = window.bigPicture.querySelector('img');
    var likes = document.querySelector('.likes-count');
    var commentsOfPost = document.querySelector('.comments-count');

    var commentsUnderPhoto = document.querySelector('.social__comments');
    var userComment;
    var allComments;

    userComment = '';
    allComments = commentsUnderPhoto.querySelectorAll('li');
    allComments.forEach(function (comment) {
      commentsUnderPhoto.removeChild(comment);
    });

    window.bigPicture.classList.remove('hidden');
    photo.src = elem.url;
    likes.textContent = elem.likes;
    commentsOfPost.textContent = elem.comments.length;
    elem.comments.forEach(function (element) {
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
    });

    commentsUnderPhoto.insertAdjacentHTML('afterBegin', userComment);
  }
  function zoomPicture() {
    var picturesContaner = document.querySelector('.pictures');
    var allPictures = picturesContaner.querySelectorAll('.picture__img');

    document
      .querySelector('.social__comment-count')
      .classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');

    for (var i = 0; i <= allPictures.length - 1; i++) {
      allPictures[i].addEventListener('click', function () {
        var urlOfPost = this.src.substring(this.src.indexOf('photo'));
        var post = window.postsArray.filter(function (item) {
          return item.url === urlOfPost;
        });
        renderBigPicture(post[0]);
      });

      allPictures[i].parentElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          var urlOfPost = this.querySelector('img').src.substring(
              this.querySelector('img').src.indexOf('photo')
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
  window.zoomPicture = zoomPicture;
})();
