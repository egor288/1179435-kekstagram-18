'use strict';
(function () {
  var post = {};

  function clearPosts() {
    var picturesContanerElement = document.querySelector('.pictures');
    var picturesInPageElement = document.querySelectorAll('.picture');

    picturesInPageElement.forEach(function (element) {
      picturesContanerElement.removeChild(element);
    });
  }

  function renderPosts(dataArr) {
    clearPosts();
    var postsArray = [];
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

      postsArray.push(post);
    });

    var similarListElement = document.querySelector('.pictures');
    var similarPostTemplate = document
      .querySelector('#picture')
      .content.querySelector('.picture');

    function renderPost(posts, i) {
      var postElement = similarPostTemplate.cloneNode(true);

      postElement.querySelector('.picture__img').src = posts.url;
      postElement.querySelector('.picture__comments').textContent =
        posts.comments.length;
      postElement.querySelector('.picture__likes').textContent = posts.likes;
      postElement.tabIndex = i;

      return postElement;
    }

    var fragment = document.createDocumentFragment();

    postsArray.forEach(function (element, index) {
      fragment.appendChild(renderPost(element, index));
    });

    similarListElement.appendChild(fragment);
    var picturesFiltersElement = document.querySelector('.img-filters');
    picturesFiltersElement.classList.remove('img-filters--inactive');
    window.zoomPicture();
  }

  window.renderPosts = renderPosts;
})();
