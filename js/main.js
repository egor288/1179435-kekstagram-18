'use strict';
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var counter = 0;
// reportValidity()
function validateSpaceLost(arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    counter = 0;
    for (var j = 0; j <= arr[i].length - 1; j++) {
      if (arr[i][j] === '#') {
        counter++;
      }
    }

    if (counter > 1) {
      return false;
    }
  }

  return true;
}

function validateHashtag(arr) {
  for (i = 0; i <= arr.length - 1; i++) {
    // максимальная длина одного хэш-тега 20 символов, включая решётку
    // хеш-тег не может состоять только из одной решётки
    // хэш-тег начинается с символа # (решётка)
    if (arr[i].length > 20 || arr[i] === '#' || arr[i][0] !== '#') {
      return false;
    }

    for (var j = 0; j <= arr.length - 1; j++) {
      // один и тот же хэш-тег не может быть использован дважды
      if (arr[i].toLowerCase() === arr[j].toLowerCase()) {
        if (i !== j) {
          return false;
        }
      }
    }
  }

  return true;
}

// Функция возвращает false если массив не прошел валидацию
function validateArray(arr) {
  // нельзя указать больше пяти хэш-тегов
  if (arr.length > 5) {
    return false;
  }

  // хэш-теги разделяются пробелами
  if (!validateSpaceLost(arr)) {
    return false;
  }
  if (!validateHashtag(arr)) {
    return false;
  }
  return true;
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

var yourPicture = document.querySelector('#upload-file');
var form = document.querySelector('.hidden');
var WIDTH_OF_SLIDER = 495;
var previewImg = document.querySelector('.img-upload__preview');

yourPicture.addEventListener('change', function () {
  form.classList.remove('hidden');
});
// 330
var moveListener = function (event) {
  deepOfEffect.style.left = event.clientX - 240 + 'px';
};

var deepOfEffect = document.querySelector('.effect-level__pin');

deepOfEffect.addEventListener('mousedown', function () {
  document.addEventListener('mousemove', moveListener, false);
});

document.addEventListener('mouseup', function () {
  var filter = getInputWithValue();
  previewImg.style.filter = changeFilter(filter, 1);
  document.removeEventListener('mousemove', moveListener, false);
});

function getInputWithValue() {
  var inputs = document.querySelectorAll('.effects__radio');
  i = inputs.length;
  while (i--) {
    if (inputs[i].checked === true) {
      return inputs[i].id;
    }
  }
  return null;
}

function changeFilter(filterValue, leftOfSlider) {
  if (filterValue === 'effect-none') {
    return '';
  } else if (filterValue === 'effect-chrome') {
    return 'grayscale(' + leftOfSlider + ')';
  } else if (filterValue === 'effect-sepia') {
    return 'sepia(' + leftOfSlider + ')';
  } else if (filterValue === 'effect-marvin') {
    return 'invert(' + parseInt(leftOfSlider * 70) + '%)';
  } else if (filterValue === 'effect-phobos') {
    return 'blur(' + leftOfSlider * 3 + 'px)';
  } else if (filterValue === 'effect-heat') {
    return 'brightness(' + leftOfSlider + ')';
  }
  return null;
}

// var buttonSubmite = document.querySelector('upload-submit');

// Метод, проверяющий валидность
function validate() {
  var hashtagInput = document.querySelector('.text__hashtags');
  hashtagInput.setCustomValidity('');
  var hashtags = hashtagInput.value;
  var hashtagsArr = hashtags.split(' ');
  if (!validateArray(hashtagsArr)) {
    hashtagInput.setCustomValidity('This is the wrong pattern for this field');
    return false;
  }
  return true;
}

function validateOnSubmit() {
  event.preventDefault();
  if (validate()) {
    document.querySelector('#upload-select-image').submit();
  }
}
