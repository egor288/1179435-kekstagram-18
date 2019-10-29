'use strict';
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var postsArray = [];
var post = {};
var commentTemplates = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var users = ['Артем', 'Егор', 'Саня', 'Лёша', 'Федя', 'Слава'];
for (var i = 1; i <= 25; i++) {
  post = {};
  post.url = 'photos/' + i + '.jpg';
  post.description = '';
  post.likes = getRandomInRange(15, 200);
  post.comments = [];

  for (var j = 1; j <= getRandomInRange(1, 5); j++) {
    var comment = {};
    comment.name = users[getRandomInRange(0, 5)];
    comment.avatar = 'img/avatar-' + getRandomInRange(1, 6) + '.svg';
    comment.message = commentTemplates[getRandomInRange(0, 5)];
    post.comments.push(comment);
  }
  postsArray.push(post);
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
for (i = 0; i < postsArray.length; i++) {
  fragment.appendChild(renderPost(postsArray[i]));
}

similarListElement.appendChild(fragment);
