'use strict';

var postsArray = [];
var post = {};

var onSuccessAjax = function (dataArr) {
  for (var key in dataArr) {
    if (dataArr.hasOwnProperty(key)) {
      post = {};
      post.url = dataArr[key].url;
      post.description = dataArr[key].description;
      post.likes = dataArr[key].likes;
      post.comments = [];
      for (var commentKey in dataArr[key].comments) {
        if (dataArr[key].comments.hasOwnProperty(commentKey)) {
          var comment = {};
          comment.name = dataArr[key].comments.name;
          comment.avatar = dataArr[key].comments.avatar;
          comment.message = dataArr[key].comments.message;
          post.comments.push(comment);
        }
      }
      postsArray.push(post);
    }
  }

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
  for (var i = 0; i < postsArray.length; i++) {
    fragment.appendChild(renderPost(postsArray[i]));
  }

  similarListElement.appendChild(fragment);
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

getaAjaxData(
    'https://js.dump.academy/kekstagram/data',
    onSuccessAjax,
    onErrorAjax
);
