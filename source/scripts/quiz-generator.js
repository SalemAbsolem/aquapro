import { makeElement, createIdFromRangeGenerator } from './util.js';

const dataTemplate = document.querySelector('#quiz-data');
let data;

if(dataTemplate) {
  data = JSON.parse(dataTemplate.content.textContent);
}

const stringGenerate = (string) => string.replaceAll('\r','').replaceAll('\n','<br>');

const firstSlideGenerate = (container) => {
  const slideContent = data['first-slide'];
  const slide = makeElement('div', {className: 'quiz__slide'});
  slide.classList.add('quiz__slide--start');
  const title = makeElement('p', {className: 'quiz__title', innerHTML: stringGenerate(slideContent['title'])});
  const description = makeElement('p', {className: 'quiz__description', innerHTML: stringGenerate(slideContent['desription'])});
  slide.append(title);
  slide.append(description);

  container.insertAdjacentElement('afterbegin', slide);
};

const serviceSlideGenerate = (container) => {
  const slideContent = data['service-slide'];
  const slide = makeElement('div', {className: 'quiz__slide'});
  slide.dataset.slide = 'services';
  const slideHeader = makeElement('div', {className: 'quiz__slide-header'});
  const title = makeElement('h3', {className: 'quiz__title', innerHTML: stringGenerate(slideContent['title'])});
  slideHeader.append(title);
  slide.append(slideHeader);

  const questions = slideContent['questions'];

  questions.forEach((el) => {
    const wrap = makeElement('p', {className: 'quiz__wrap-input'});
    const input = makeElement('input', {className: 'quiz__input', type: 'radio', name: 'service', value: el['value'], id: el['value']});
    input.classList.add('quiz__input--radio');
    input.classList.add('visually-hidden');
    wrap.append(input);
    const label = makeElement('label', {className: 'quiz__label'});
    label.setAttribute('for', el['value']);
    const text = makeElement('span', {className: 'quiz__label-text', innerHTML:  stringGenerate(el['question'])});
    const icon = makeElement('span', {className: 'quiz__label-icon'});
    label.append(text);
    label.append(icon);
    wrap.append(label);
    slide.append(wrap);
  });

  container.append(slide);
};

const generatorStepTwo = (container, branch, prefix) => {
  const slide = makeElement('div', {className: 'quiz__slide'});
  slide.dataset.slide = prefix;
  const slideHeader = makeElement('div', {className: 'quiz__slide-header'});
  const title = makeElement('h3', {className: 'quiz__title', innerHTML: stringGenerate(branch['title'])});
  slideHeader.append(title);
  slide.append(slideHeader);

  const questions = branch['questions'];

  if(questions) {
    questions.forEach((el) => {
      const wrap = makeElement('p', {className: 'quiz__wrap-input'});
      const input = makeElement('input', {className: 'quiz__input', type: 'radio', name: prefix, value: `${prefix}-${el['value']}`, id: el['value']});
      input.classList.add('quiz__input--radio');
      input.classList.add('visually-hidden');
      wrap.append(input);
      const label = makeElement('label', {className: 'quiz__label'});
      label.setAttribute('for', el['value']);
      const text = makeElement('span', {className: 'quiz__label-text', innerHTML: stringGenerate(el['question'])});
      const icon = makeElement('span', {className: 'quiz__label-icon'});
      label.append(text);
      label.append(icon);
      wrap.append(label);

      if(el['explanation']) {
        const moreBtn = makeElement('button', {className: 'quiz__button-more-info', type: 'button'});
        moreBtn.classList.add('button');
        moreBtn.classList.add('button--quiz-more-info');
        const textBtn = makeElement('span', {className: 'button__text', textContent: 'Что это такое'});
        moreBtn.append(textBtn);
        wrap.append(moreBtn);
        const moreInfo = makeElement('span', {className: 'quiz__info-by-input', innerHTML: stringGenerate(el['explanation'])});
        wrap.append(moreInfo);
      }

      slide.append(wrap);
    });
  } else if(branch['type'] === 'text') {
    const wrap = makeElement('p', {className: 'quiz__wrap-input'});
    const textInput = makeElement('input', {className: 'quiz__input', type: 'text', name: branch['name'], placeholder: ' ', id: `${prefix}-${branch['name']}`});
    textInput.classList.add('quiz__input--text');
    wrap.append(textInput);
    const textLabel = makeElement('label', {className: 'quiz__label'});
    textLabel.setAttribute('for', branch['name']);
    const textOfLabel = makeElement('span', {className: 'quiz__label-text', textContent: 'Ответ'});
    textLabel.append(textOfLabel);
    wrap.append(textLabel);
    slide.append(wrap);
  }

  container.append(slide);
};

const stepTwoSlideGenerate = (container, elem) => {
  const slideContent = data['step-two-slide'];
  generatorStepTwo(container, slideContent[elem.value], elem.value);
};

const branchGenerator = (container, branch, prefix) => {
  branch.forEach((elem) => {
    const slide = makeElement('div', {className: 'quiz__slide'});
    slide.dataset.slide = prefix;
    const slideHeader = makeElement('div', {className: 'quiz__slide-header'});
    const title = makeElement('h3', {className: 'quiz__title', innerHTML: stringGenerate(elem['title'])});
    slideHeader.append(title);
    if(elem['multiple']) {
      const notice = makeElement('span', {className: 'quiz__title-notice', innerHTML: stringGenerate(elem['multiple'])});
      slideHeader.append(notice);
    }
    if(elem['explanation']) {
      const moreBtn = makeElement('button', {className: 'quiz__button-more-info', type: 'button'});
      moreBtn.classList.add('button');
      moreBtn.classList.add('button--quiz-more-info');
      const textBtn = makeElement('span', {className: 'button__text', textContent: 'Что это такое'});
      moreBtn.append(textBtn);
      slideHeader.append(moreBtn);
      const moreInfo = makeElement('span', {className: 'quiz__info-by-input', innerHTML: stringGenerate(elem['explanation'])});
      slideHeader.append(moreInfo);
    }
    slide.append(slideHeader);

    const questions = elem['questions'];

    if(questions) {
      questions.forEach((el, i) => {
        const wrap = makeElement('p', {className: 'quiz__wrap-input'});
        let input;
        const randomId = createIdFromRangeGenerator(1, 99999, true);
        const id = `${el['value']}-${randomId()}`;
        if(elem['multiple']) {
          input = makeElement('input', {className: 'quiz__input', type: 'checkbox', name: `${elem['name']}-${i + 1}`, value: el['value'], id: id});
          input.classList.add('quiz__input--checkbox');
        } else {
          input = makeElement('input', {className: 'quiz__input', type: 'radio', name: elem['name'], value: el['value'], id: id});
          input.classList.add('quiz__input--radio');
        }
        input.classList.add('visually-hidden');
        wrap.append(input);
        const label = makeElement('label', {className: 'quiz__label'});
        label.setAttribute('for', id);
        const text = makeElement('span', {className: 'quiz__label-text', innerHTML: stringGenerate(el['question'])});
        const icon = makeElement('span', {className: 'quiz__label-icon'});
        label.append(text);
        label.append(icon);
        wrap.append(label);

        if(el['explanation']) {
          const moreBtn = makeElement('button', {className: 'quiz__button-more-info', type: 'button'});
          moreBtn.classList.add('button');
          moreBtn.classList.add('button--quiz-more-info');
          const textBtn = makeElement('span', {className: 'button__text', textContent: 'Что это такое'});
          moreBtn.append(textBtn);
          wrap.append(moreBtn);
          const moreInfo = makeElement('span', {className: 'quiz__info-by-input', innerHTML: stringGenerate(el['explanation'])});
          wrap.append(moreInfo);
        }

        if(el['value'] === 'other') {
          const hiddenInput = makeElement('input', {className: 'quiz__input', type: 'text', name: `${elem['name']}-other`, placeholder: ' ', id: el['value']});
          hiddenInput.classList.add('quiz__input--text');
          hiddenInput.classList.add('quiz__input--text-other');
          wrap.append(hiddenInput);
          const hiddenLabel = makeElement('label', {className: 'quiz__label'});
          hiddenLabel.classList.add('quiz__label--text-other');
          hiddenLabel.setAttribute('for', el['value']);
          const hiddenText = makeElement('span', {className: 'quiz__label-text', textContent: 'Ответ'});
          hiddenLabel.append(hiddenText);
          wrap.append(hiddenLabel);
        }

        slide.append(wrap);
      });
    } else if(elem['type'] === 'text') {
      const wrap = makeElement('p', {className: 'quiz__wrap-input'});
      const textInput = makeElement('input', {className: 'quiz__input', type: 'text', name: elem['name'], placeholder: ' ', id: elem['name']});
      textInput.classList.add('quiz__input--text');
      wrap.append(textInput);
      const textLabel = makeElement('label', {className: 'quiz__label'});
      textLabel.setAttribute('for', elem['name']);
      const textOfLabel = makeElement('span', {className: 'quiz__label-text', textContent: 'Ответ'});
      textLabel.append(textOfLabel);
      wrap.append(textLabel);
      slide.append(wrap);
    } else if(elem['type'] === 'final') {
      slide.classList.add('quiz__slide--final');
      const wrapName = makeElement('p', {className: 'quiz__wrap-input'});
      const inputName = makeElement('input', {className: 'quiz__input', type: 'text', name: 'user-name', placeholder: ' ', id: 'name'});
      inputName.classList.add('quiz__input--text');
      inputName.classList.add('quiz__input--name');
      inputName.setAttribute('required', 'true');
      inputName.dataset.pristineRequiredMessage = 'Это поле необходимо заполнить';
      wrapName.append(inputName);
      const labelName = makeElement('label', {className: 'quiz__label'});
      labelName.setAttribute('for', 'name');
      const textLabelName = makeElement('span', {className: 'quiz__label-text', textContent: 'Имя'});
      labelName.append(textLabelName);
      wrapName.append(labelName);
      slide.append(wrapName);

      const wrapPhone = makeElement('p', {className: 'quiz__wrap-input'});
      const inputPhone = makeElement('input', {className: 'quiz__input', type: 'text', name: 'user-phone', placeholder: ' ', id: 'phone'});
      inputPhone.classList.add('quiz__input--text');
      inputPhone.classList.add('quiz__input--phone');
      inputPhone.setAttribute('required', 'true');
      inputPhone.dataset.pristineRequiredMessage = 'Это поле необходимо заполнить';
      wrapPhone.append(inputPhone);
      const labelPhone = makeElement('label', {className: 'quiz__label'});
      labelPhone.setAttribute('for', 'phone');
      const textLabelPhone = makeElement('span', {className: 'quiz__label-text', textContent: 'Телефон'});
      labelPhone.append(textLabelPhone);
      wrapPhone.append(labelPhone);
      slide.append(wrapPhone);

      const wrapEmail = makeElement('p', {className: 'quiz__wrap-input'});
      const inputEmail = makeElement('input', {className: 'quiz__input', type: 'text', name: 'user-email', placeholder: ' ', id: 'email'});
      inputEmail.classList.add('quiz__input--text');
      inputEmail.classList.add('quiz__input--email');
      inputEmail.setAttribute('required', 'true');
      inputEmail.dataset.pristineRequiredMessage = 'Это поле необходимо заполнить';
      wrapEmail.append(inputEmail);
      const labelEmail = makeElement('label', {className: 'quiz__label'});
      labelEmail.setAttribute('for', 'email');
      const textLabelEmail = makeElement('span', {className: 'quiz__label-text', textContent: 'Почта'});
      labelEmail.append(textLabelEmail);
      wrapEmail.append(labelEmail);
      slide.append(wrapEmail);

      const wrapPrivacy = makeElement('p', {className: 'quiz__wrap-input'});
      wrapPrivacy.classList.add('quiz__wrap-input--privacy');
      const inputPrivacy = makeElement('input', {className: 'quiz__input', type: 'checkbox', name: 'privacy', id: 'privacy'});
      inputPrivacy.classList.add('quiz__input--privacy');
      inputPrivacy.classList.add('visually-hidden');
      inputPrivacy.setAttribute('required', 'true');
      inputPrivacy.dataset.pristineRequiredMessage = 'Это поле необходимо заполнить';
      wrapPrivacy.append(inputPrivacy);
      const labelPrivacy = makeElement('label', {className: 'quiz__label', textContent: 'Даю согласие на'});
      labelPrivacy.classList.add('quiz__label--privacy');
      labelPrivacy.setAttribute('for', 'privacy');
      const iconPrivacy = makeElement('span', {className: 'quiz__label-icon'});
      labelPrivacy.insertAdjacentElement('afterbegin', iconPrivacy);
      wrapPrivacy.append(labelPrivacy);
      const linkPrivacy = makeElement('a', {className: 'quiz__checkbox-link', href: '#', textContent: 'обработку персональных данных'});
      wrapPrivacy.append(linkPrivacy);
      slide.append(wrapPrivacy);

      const submitBtn = makeElement('div', {className: 'quiz__button-submit'});
      submitBtn.classList.add('button');
      submitBtn.classList.add('button--submit-quiz');
      submitBtn.classList.add('button--blue-text');
      const textBtn = makeElement('span', {className: 'button__text', textContent: 'Отправить'});
      submitBtn.append(textBtn);
      slide.append(submitBtn);
    }

    container.append(slide);
  });
};

const branchSlideGenerate = (container, elem) => {
  const slideContent = elem.value ? data[elem.value] : data[elem];
  branchGenerator(container, slideContent, elem.value ? elem.value : elem);
};

export { firstSlideGenerate, serviceSlideGenerate, stepTwoSlideGenerate, branchSlideGenerate};
