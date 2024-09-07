import { PORTFOLIO_CASE, MOBILE_ONLY, TABLET_ONLY } from './constants.js';

const showCaseInit = (list, btnMore) => {
  const itemsArr = [];
  const items = list.childNodes;
  items.forEach.call(items, (elem) => {
    if(elem.nodeName.indexOf('#') === -1) {
      itemsArr.push(elem);
    }
  });

  const itemsCount = itemsArr.length;

  if(itemsCount > PORTFOLIO_CASE) {
    itemsArr.forEach((el, i) => {
      if(i > PORTFOLIO_CASE - 1) {
        el.style.display = 'none';
      } else {
        el.style.display = 'flex';
      }
    });
    btnMore.style.display = 'flex';
  } else {
    btnMore.style.display = 'none';
  }
};

const showMoreFunc = (list, btnMore) => {
  const itemsArr = [];
  const items = list.childNodes;
  items.forEach.call(items, (elem) => {
    if(elem.nodeName.indexOf('#') === -1) {
      itemsArr.push(elem);
    }
  });

  itemsArr.forEach((el) => {
    el.style.display = 'flex';
  });

  btnMore.style.display = 'none';
};

const showMoreArticle = (list, button) => {
  if(!list || !button || list.length === 0) {
    return;
  }

  if(MOBILE_ONLY.matches || TABLET_ONLY.matches) {
    if(list.length > 2) {
      list.forEach((el, i) => {
        if(i + 1 > 2) {
          el.style.display = 'none';
        }
      });

      button.style.display = null;
    } else {
      button.style.display = 'none';
    }
  } else {
    if(list.length > 4) {
      list.forEach((el, i) => {
        if(i + 1 > 4) {
          el.style.display = 'none';
        }
      });

      button.style.display = null;
    } else {
      button.style.display = 'none';
    }
  }

  button.addEventListener('click', () => {
    list.forEach((el) => {
      el.style.display = null;
    });

    button.style.display = 'none';
  });
};

const showMoreQuiz = () => {
  const quiz = document.querySelector('.quiz form');
  if(!quiz) {
    return;
  }

  quiz.addEventListener('click', (e) => {
    if(e.target.closest('.quiz__button-more-info')) {
      const texts = quiz.querySelectorAll('.quiz__info-by-input');
      const btns = quiz.querySelectorAll('.quiz__button-more-info');
      btns.forEach((el) => el.classList.remove('button--quiz-more-info-open'));

      const group = e.target.closest('.quiz__button-more-info').parentNode;
      const text = group.querySelector('.quiz__info-by-input');

      if(text.classList.contains('quiz__info-by-input--open')) {
        text.classList.remove('quiz__info-by-input--open');
      } else {
        texts.forEach((el) => el.classList.remove('quiz__info-by-input--open'));
        text.classList.add('quiz__info-by-input--open');
      }

      if(e.target.classList.contains('button--quiz-more-info-open')) {
        e.target.classList.remove('button--quiz-more-info-open');
      } else {
        e.target.classList.add('button--quiz-more-info-open');
      }
    }
  });
};

export { showCaseInit, showMoreFunc, showMoreQuiz, showMoreArticle };
