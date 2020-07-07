'use strict';

(function () {
  var СOATS_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {},
  };

  var getRandElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');

  wizardCoat.addEventListener('click', function () {
    var newColor = getRandElement(СOATS_COLORS);
    wizardCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var wizardEyes = setupWizard.querySelector('.wizard-eyes');

  wizardEyes.addEventListener('click', function () {
    var newColor = getRandElement(EYES_COLORS);
    wizardEyes.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = wizard;
})();
