'use strict';

(function () {
  var userDialog = window.setup.userDialog;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var isUserNameInputFocused = false;

  setupUserName.addEventListener('focus', function () {
    isUserNameInputFocused = true;
  });

  setupUserName.addEventListener('blur', function () {
    isUserNameInputFocused = false;
  });

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (!isUserNameInputFocused) {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    userDialog.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
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

  window.dialog = {
    setupUserName: setupUserName
  };
})();
