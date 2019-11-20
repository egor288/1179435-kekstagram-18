'use strict';
(function () {
  var randomElement = document.querySelector('#filter-random');
  var discussedElement = document.querySelector('#filter-discussed');
  var popularElement = document.querySelector('#filter-popular');
  var newPosts;
  var debouncedRenderPosts = window.debounce(window.renderPosts);

  popularElement.addEventListener('click', onPopularClick);
  randomElement.addEventListener('click', onRandomClick);
  discussedElement.addEventListener('click', onDiscussedClick);

  function onPopularClick() {
    randomElement.classList.remove('img-filters__button--active');
    discussedElement.classList.remove('img-filters__button--active');
    popularElement.classList.add('img-filters__button--active');
    debouncedRenderPosts(window.postsArray);
  }

  function onRandomClick() {
    popularElement.classList.remove('img-filters__button--active');
    discussedElement.classList.remove('img-filters__button--active');
    randomElement.classList.add('img-filters__button--active');
    sortPostsByRandom();
  }

  function onDiscussedClick() {
    randomElement.classList.remove('img-filters__button--active');
    popularElement.classList.remove('img-filters__button--active');
    discussedElement.classList.add('img-filters__button--active');
    sortPostsByComments();
  }

  function sortPostsByComments() {
    newPosts = [];
    newPosts = window.postsArray.slice(0);
    newPosts.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    debouncedRenderPosts(newPosts);
  }

  function sortPostsByRandom() {
    newPosts = [];
    newPosts = window.postsArray.slice(0);

    var currentIndex = newPosts.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = newPosts[currentIndex];
      newPosts[currentIndex] = newPosts[randomIndex];
      newPosts[randomIndex] = temporaryValue;
    }

    debouncedRenderPosts(newPosts.slice(0, 10));
  }
})();
