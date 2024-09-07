const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

let autoHideMessage;

function hideMessage() {
  clearTimeout(autoHideMessage);
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if(evt.target.closest('.success__wrap') || evt.target.closest('.error__wrap')) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  autoHideMessage = setTimeout(hideMessage, 5000);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${(value || '')}${expires}; path=/`;
};

const getCookie = (name) => {
  // eslint-disable-next-line no-useless-escape
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const checkCookies = () => {
  const cookieNote = document.querySelector('.cookie');
  if(!cookieNote) {
    return;
  }
  const cookieBtnAccept = cookieNote.querySelector('.cookie__button');

  if (!getCookie('cookies_policy')) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        cookieNote.classList.add('cookie--show');
      }, 1000);
    });
  }

  cookieBtnAccept.addEventListener('click', () => {
    setCookie('cookies_policy', 'true', 365);
    cookieNote.classList.remove('cookie--show');
  });
};

export {showSuccessMessage, showErrorMessage, checkCookies};
