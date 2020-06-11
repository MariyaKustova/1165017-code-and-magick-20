'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var СOATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MIN_NAME_LENGTH = 2;

var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var wizardCoat = userDialog.querySelector('.wizard-coat');
var coatColorInput = userDialog.querySelector('.coat-color-input');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var eyesColorInput = userDialog.querySelector('.eyes-color-input');
var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
var setupFireballInput = userDialog.querySelector('.setup-fireball-input');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      userDialog.classList.add('hidden');
    }
  });
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

setupUserName.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
  }
});

setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2 символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя должно состоять максимум из 25 символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

setupUserName.addEventListener('input', function () {
  var valueLengt = setupUserName.value.length;
  if (valueLengt < MIN_NAME_LENGTH) {
    setupUserName.setCustomValidity('Еще ' + MIN_NAME_LENGTH - valueLengt + ' симв.');
  } else if (valueLengt > MAX_NAME_LENGTH) {
    setupUserName.setCustomValidity('Удалите лишние ' + valueLengt - MAX_NAME_LENGTH + ' симв.');
  } else {
    setupUserName.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandElement(СOATS_COLORS);
  coatColorInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandElement(EYES_COLORS);
  eyesColorInput.value = wizardEyes.style.fill;
});

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.backgroundColor = getRandElement(FIREBALL_COLORS);
  setupFireballInput.value = setupFireballWrap.style.backgroundColor;
});

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [];

var getRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var createWizard = function () {
  var wizard = {};
  wizard.name = getRandElement(WIZARD_NAMES) + ' ' + getRandElement(WIZARD_SURNAMES);
  wizard.coatColor = getRandElement(СOATS_COLORS);
  wizard.eyesColor = getRandElement(EYES_COLORS);
  return wizard;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

for (var i = 0; i < 4; i++) {
  var wzd = createWizard();
  wizards.push(wzd);
}

var fragment = document.createDocumentFragment();

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
