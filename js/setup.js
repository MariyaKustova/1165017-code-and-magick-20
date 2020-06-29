'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var СOATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var MIN_NAME_LENGTH = 2;

  var MAX_NAME_LENGTH = 25;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var coatColorInput = userDialog.querySelector('.coat-color-input');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var eyesColorInput = userDialog.querySelector('.eyes-color-input');
  var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
  var setupFireballInput = userDialog.querySelector('.setup-fireball-input');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');

  var getRandElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < MAX_SIMILAR_WIZARD_COUNT; j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var colorize = function (element, colors, input) {
    element.addEventListener('click', function () {
      var color = getRandElement(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        input.value = element.style.backgroundColor;
      } else {
        element.style.fill = color;
        input.value = element.style.fill;
      }
    });
  };

  colorize(wizardCoat, СOATS_COLORS, coatColorInput);
  colorize(wizardEyes, EYES_COLORS, eyesColorInput);
  colorize(setupFireballWrap, FIREBALL_COLORS, setupFireballInput);

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

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      window.setup.userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  window.setup = {
    userDialog: userDialog,
    setupUserName: setupUserName,
    СOATS_COLORS: СOATS_COLORS,
    EYES_COLORS: EYES_COLORS,
    getRandElement: getRandElement
  };
})();
