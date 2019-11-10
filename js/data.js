"use strict";
(function() {
  var postsArray = [];
  var post = {};

  var onSuccessAjax = function(dataArr) {
    dataArr.forEach(function(element) {
      post = {};
      post.url = element.url;
      post.description = element.description;
      post.likes = element.likes;
      post.comments = [];
      element.comments.forEach(function(commelement) {
        var comment = {};
        comment.name = commelement.name;
        comment.avatar = commelement.avatar;
        comment.message = commelement.message;
        post.comments.push(comment);
      });

      postsArray.push(post);
    });

    var similarListElement = document.querySelector(".pictures");
    var similarPostTemplate = document
      .querySelector("#picture")
      .content.querySelector(".picture");

    var renderPost = function(posts) {
      var postElement = similarPostTemplate.cloneNode(true);

      postElement.querySelector(".picture__img").src = posts.url;
      postElement.querySelector(".picture__comments").textContent =
        posts.comments.length;
      postElement.querySelector(".picture__likes").textContent = posts.likes;

      return postElement;
    };

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < postsArray.length; i++) {
      fragment.appendChild(renderPost(postsArray[i]));
    }

    similarListElement.appendChild(fragment);
    var picturesFilters = document.querySelector(".img-filters");
    picturesFilters.classList.remove("img-filters--inactive");
    // var page = postsArray.sort(function(a, b) {
    //   if (a.post.comments.length > b.post.comments.length) {
    //     return 1;
    //   }
    //   if (a.post.comments.length < b.post.comments.length) {
    //     return -1;
    //   }
    //   // a должно быть равным b
    //   return 0;
    // });
    // console.log(page);
  };

  var errorTemplate = document
    .querySelector("#error")
    .content.querySelector(".error");

  var onErrorAjax = function() {
    var main = document.querySelector("main");
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    main.appendChild(fragment);
  };

  window.getAjaxData(
    "https://js.dump.academy/kekstagram/data",
    onSuccessAjax,
    onErrorAjax
  );
})();
