'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var СOATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var coatColorInput = userDialog.querySelector('.coat-color-input');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var eyesColorInput = userDialog.querySelector('.eyes-color-input');
  var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
  var setupFireballInput = userDialog.querySelector('.setup-fireball-input');
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

  window.setup = {
    userDialog: userDialog,
    СOATS_COLORS: СOATS_COLORS,
    EYES_COLORS: EYES_COLORS,
    getRandElement: getRandElement
  };
})();
