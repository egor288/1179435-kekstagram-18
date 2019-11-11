'use strict';
(function () {
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function zoomPicture() {
    document
      .querySelector('.social__comment-count')
      .classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
    var bigPicture = document.querySelector('.big-picture');
    var photo = bigPicture.querySelector('img');
    var likes = document.querySelector('.likes-count');
    var commentsOfPost = document.querySelector('.comments-count');
    var cancelZoom = document.querySelector('#picture-cancel');
    var commentsUnderPhoto = document.querySelector('.social__comments');
    var userComment;
    var ollComments;

    document
      .querySelector('.picture__img')
      .addEventListener('click', function () {
        userComment = '';
        ollComments = commentsUnderPhoto.querySelectorAll('li');
        ollComments.forEach(function (comment) {
          commentsUnderPhoto.removeChild(comment);
        });

        bigPicture.classList.remove('hidden');
        photo.src = window.postsArray[0].url;
        likes.textContent = window.postsArray[0].likes;
        commentsOfPost.textContent = window.postsArray[0].comments.length;
        window.postsArray[0].comments.forEach(function (element) {
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
      });

    cancelZoom.addEventListener('click', function () {
      bigPicture.classList.add('hidden');
    });
  }
  window.zoomPicture = zoomPicture;
})();
