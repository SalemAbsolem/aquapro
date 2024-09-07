import '../vendor/pristine/pristine.min.js';
import {parsePhoneNumber, validatePhoneNumberLength, AsYouType} from 'libphonenumber-js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const getIdForm = (form) => form.action.slice(form.action.indexOf('-f') + 2, form.action.lastIndexOf('-'));

const addPlusFunction = (input) => {
  input.addEventListener('focus', () => {
    if(input.value.replaceAll(' ', '') === '' || input.value.replaceAll(' ', '') === '+') {
      input.value = '+';
    }
  });
};

const phoneValidText = (telInput) => {
  let errorCode;
  const phoneNumber = new AsYouType();
  phoneNumber.input(telInput.value);
  let phoneNumberCountry;
  try {
    telInput.value = parsePhoneNumber(telInput.value).format('INTERNATIONAL');
    try {
      phoneNumberCountry = phoneNumber.getNumber().country;
    } catch {
      phoneNumberCountry = '';
    }
    errorCode = validatePhoneNumberLength(telInput.value, phoneNumberCountry);
  } catch {
    errorCode = validatePhoneNumberLength(telInput.value);
  }

  return (errorCode === undefined);
};

const emailReg = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;

const redirectIndex = () => {
  if(window.location.pathname !== '/kviz/') {
    showSuccessMessage();
  } else {
    showSuccessMessage();
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }

};

const consultForm = document.querySelector('.consult form');
if(consultForm) {
  const wpcfTrash = consultForm.querySelectorAll('.wpcf7-response-output');
  if(wpcfTrash.length > 0) {
    wpcfTrash.forEach((el) => {
      el.setAttribute('style', 'display: none !important;');
    });
  }
  const wrapInput = consultForm.querySelectorAll('.form-consult__wrap-input');
  wrapInput.forEach((el) => {
    if(el.querySelector('.wpcf7-form-control-wrap')) {
      const input = el.querySelector('.wpcf7-form-control-wrap').innerHTML;
      el.querySelector('.form-consult__label').insertAdjacentHTML('beforebegin', input);
      el.querySelector('.wpcf7-form-control-wrap').innerHTML = '';
      el.querySelector('.wpcf7-form-control-wrap').setAttribute('style', 'display: none !important;');
    }
  });

  const nameInput = consultForm.querySelector('input#name');
  const emailInput = consultForm.querySelector('input#email');
  const phoneInput = consultForm.querySelector('input#phone');
  const privacyInput = consultForm.querySelector('input#privacy');
  const submitBtn = consultForm.querySelector('.form-consult__button');

  const config = {
    classTo: 'form-consult__wrap-input',
    errorClass: 'form-consult__wrap-input--error',
    errorTextParent: 'form-consult__wrap-input',
    errorTextTag: 'span',
    errorTextClass: 'form-consult__error-text'
  };

  const validator = new Pristine(consultForm, config);

  validator.addValidator(nameInput, (value) => value.length >= 2, 'Введите ваше Имя');
  validator.addValidator(emailInput, (value) => value.length >= 5 && emailReg.test(value), 'Введите корректный Email');
  validator.addValidator(phoneInput, (value) => value.length >= 1 && phoneValidText(phoneInput), 'Введите корректный Телефон');
  validator.addValidator(privacyInput, () => privacyInput.checked, 'Нам нужно Ваше согласие!');

  addPlusFunction(phoneInput);

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if(validator.validate()) {
      const idForm = getIdForm(consultForm);
      try {
        blockedButton(submitBtn);
        await sendData(idForm, new FormData(consultForm));
        redirectIndex();
      } catch {
        showErrorMessage();
        consultForm.reset();
      } finally {
        blockedButton(submitBtn);
      }
    }

  });
}

function blockedButton (button) {
  if(button.classList.contains('quiz__button-submit--blocked')) {
    button.classList.remove('quiz__button-submit--blocked');
    button.querySelector('.button__text').textContent = 'Отправить';
  } else {
    button.classList.add('quiz__button-submit--blocked');
    button.querySelector('.button__text').textContent = 'Отправляю...';
  }
}

const quizValidate = (form) => {
  if(!form) {
    return;
  }

  const wpcfTrash = form.querySelectorAll('.wpcf7-response-output');
  if(wpcfTrash.length > 0) {
    wpcfTrash.forEach((el) => {
      el.setAttribute('style', 'display: none !important;');
    });
  }
  const wrapInput = form.querySelectorAll('.quiz__wrap-input');
  wrapInput.forEach((el) => {
    if(el.querySelector('.wpcf7-form-control-wrap')) {
      const input = el.querySelector('.wpcf7-form-control-wrap').innerHTML;
      el.querySelector('.quiz__label').insertAdjacentHTML('beforebegin', input);
      el.querySelector('.wpcf7-form-control-wrap').innerHTML = '';
      el.querySelector('.wpcf7-form-control-wrap').setAttribute('style', 'display: none !important;');
    }
  });

  const nameInput = form.querySelector('input#name');
  const emailInput = form.querySelector('input#email');
  const phoneInput = form.querySelector('input#phone');
  const privacyInput = form.querySelector('input#privacy');
  const submitBtn = form.querySelector('.quiz__button-submit');

  const config = {
    classTo: 'quiz__wrap-input',
    errorClass: 'quiz__wrap-input--error',
    errorTextParent: 'quiz__wrap-input',
    errorTextTag: 'span',
    errorTextClass: 'quiz__error-text'
  };

  const validQuiz = new Pristine(form, config);

  validQuiz.addValidator(nameInput, (value) => value.length >= 2, 'Введите ваше Имя');
  validQuiz.addValidator(emailInput, (value) => value.length >= 5 && emailReg.test(value), 'Введите корректный Email');
  validQuiz.addValidator(phoneInput, (value) => value.length >= 1 && phoneValidText(phoneInput), 'Введите корректный Телефон');
  validQuiz.addValidator(privacyInput, () => privacyInput.checked, 'Нам нужно Ваше согласие!');

  addPlusFunction(phoneInput);

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if(validQuiz.validate()) {
      const idForm = getIdForm(form);
      try {
        blockedButton(submitBtn);
        await sendData(idForm, new FormData(form));
        redirectIndex();
      } catch {
        showErrorMessage();
      } finally {
        blockedButton(submitBtn);
      }
    }
  });
};

export { quizValidate };
