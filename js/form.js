'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var setupUserName = window.dialog.setupUserName;

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
})();
