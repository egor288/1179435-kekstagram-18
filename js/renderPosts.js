'use strict';
(function () {
  var postsArray = [];
  var post = {};

  function clearPosts() {
    var picturesContaner = document.querySelector('.pictures');
    var picturesInPage = document.querySelectorAll('.picture');
    for (var i = 0; i <= picturesInPage.length - 1; i++) {
      picturesContaner.removeChild(picturesInPage[i]);
    }
  }

  function renderPosts(dataArr) {
    clearPosts();
    var renderArr = [];
    dataArr.forEach(function (element) {
      post = {};
      post.url = element.url;
      post.description = element.description;
      post.likes = element.likes;
      post.comments = [];
      element.comments.forEach(function (commelement) {
        var comment = {};
        comment.name = commelement.name;
        comment.avatar = commelement.avatar;
        comment.message = commelement.message;
        post.comments.push(comment);
      });

      renderArr.push(post);
    });

    var similarListElement = document.querySelector('.pictures');
    var similarPostTemplate = document
      .querySelector('#picture')
      .content.querySelector('.picture');

    var renderPost = function (posts) {
      var postElement = similarPostTemplate.cloneNode(true);

      postElement.querySelector('.picture__img').src = posts.url;
      postElement.querySelector('.picture__comments').textContent =
        posts.comments.length;
      postElement.querySelector('.picture__likes').textContent = posts.likes;

      return postElement;
    };

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < renderArr.length; i++) {
      fragment.appendChild(renderPost(renderArr[i]));
    }

    similarListElement.appendChild(fragment);
    var picturesFilters = document.querySelector('.img-filters');
    picturesFilters.classList.remove('img-filters--inactive');
  }

  window.renderPosts = renderPosts;
})();
