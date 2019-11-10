'use strict';
(function () {
  var random = document.querySelector('#filter-random');
  var discussed = document.querySelector('#filter-discussed');
  var popular = document.querySelector('#filter-popular');
  var newArr;

  popular.addEventListener('click', popularDisplay);
  random.addEventListener('click', randomDisplay);
  discussed.addEventListener('click', discussedDisplay);

  function popularDisplay() {
    random.classList.remove('img-filters__button--active');
    discussed.classList.remove('img-filters__button--active');
    popular.classList.add('img-filters__button--active');
    window.renderPosts(window.postsArray);
  }

  function randomDisplay() {
    popular.classList.remove('img-filters__button--active');
    discussed.classList.remove('img-filters__button--active');
    random.classList.add('img-filters__button--active');
    sortByRandom();
  }

  function discussedDisplay() {
    random.classList.remove('img-filters__button--active');
    popular.classList.remove('img-filters__button--active');
    discussed.classList.add('img-filters__button--active');
    sortByComments();
  }

  function sortByComments() {
    newArr = [];
    newArr = window.postsArray.slice(0);
    newArr.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPosts(newArr);
  }

  function sortByRandom() {
    newArr = [];
    newArr = window.postsArray.slice(0);

    var currentIndex = newArr.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = newArr[currentIndex];
      newArr[currentIndex] = newArr[randomIndex];
      newArr[randomIndex] = temporaryValue;
    }

    window.renderPosts(newArr.slice(0, 10));
  }
})();
