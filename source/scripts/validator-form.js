import '../vendor/pristine/pristine.min.js';

const consultForm = document.querySelector('form.form-consult');
const nameInput = consultForm.querySelector('input#name');
const emailInput = consultForm.querySelector('input#email');
const phoneInput = consultForm.querySelector('input#phone');

const config = {
  classTo: 'form-consult__wrap-input',
  errorClass: 'form-consult__wrap-input--error',
  errorTextParent: 'form-consult__wrap-input',
  errorTextTag: 'span',
  errorTextClass: 'form-consult__error-text'
};

const validator = new Pristine(consultForm, config);

validator.addValidator(nameInput, (value) => value.length > 0, `Введите ваше ${nameInput.name}`);
validator.addValidator(emailInput, (value) => value.length > 0, `Введите ваш ${emailInput.name}`);
validator.addValidator(phoneInput, (value) => value.length > 0, `Введите ваш ${phoneInput.name}`);


consultForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(validator.validate()) {
    consultForm.submit();
  }
});
