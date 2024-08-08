import '../vendor/pristine/pristine.min.js';
import {parsePhoneNumber, validatePhoneNumberLength, AsYouType} from 'libphonenumber-js';

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

const consultForm = document.querySelector('form.form-consult');
const nameInput = consultForm.querySelector('input#name');
const emailInput = consultForm.querySelector('input#email');
const phoneInput = consultForm.querySelector('input#phone');
const privacyInput = consultForm.querySelector('input#privacy');

const config = {
  classTo: 'form-consult__wrap-input',
  errorClass: 'form-consult__wrap-input--error',
  errorTextParent: 'form-consult__wrap-input',
  errorTextTag: 'span',
  errorTextClass: 'form-consult__error-text'
};

const validator = new Pristine(consultForm, config);

validator.addValidator(nameInput, (value) => value.length >= 2, `Введите ваше ${nameInput.name}`);
validator.addValidator(emailInput, (value) => value.length >= 5 && emailReg.test(value), `Введите корректный ${emailInput.name}`);
validator.addValidator(phoneInput, (value) => value.length >= 1 && phoneValidText(phoneInput), `Введите корректный ${phoneInput.name}`);
validator.addValidator(privacyInput, () => privacyInput.checked, 'Нам нужно Ваше согласие!');

addPlusFunction(phoneInput);

consultForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(validator.validate()) {
    consultForm.submit();
  }
});
