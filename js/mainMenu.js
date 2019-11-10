"use strict";
(function() {
  var random = document.querySelector("#filter-random");
  var discussed = document.querySelector("#filter-discussed");
  var popular = document.querySelector("#filter-popular");

  popular.addEventListener("click", popularDisplay);
  random.addEventListener("click", randomDisplay);
  discussed.addEventListener("click", discussedDisplau);

  function clearPosts() {
    var picturesContaner = document.querySelector(".pictures");
    var picturesInPage = document.querySelectorAll(".picture");
    for (var i = 0; i <= postsArray.length - 1; i++)
      picturesContaner.removeChild(picturesInPage[i]);
  }

  function popularDisplay() {
    random.classList.remove("img-filters__button--active");
    discussed.classList.remove("img-filters__button--active");
    popular.classList.add("img-filters__button--active");
    clearPosts();
  }

  function randomDisplay() {
    popular.classList.remove("img-filters__button--active");
    discussed.classList.remove("img-filters__button--active");
    random.classList.add("img-filters__button--active");
    clearPosts();
  }

  function discussedDisplau() {
    random.classList.remove("img-filters__button--active");
    popular.classList.remove("img-filters__button--active");
    discussed.classList.add("img-filters__button--active");
    clearPosts();
  }
})();
