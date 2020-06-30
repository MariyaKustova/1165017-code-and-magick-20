'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similar = document.querySelector('.setup-similar');
  var similarListElement = similar.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = wizard.name;
    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  };

  window.render = function (data) {
    var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }
    similar.classList.remove('hidden');
  };
})();
