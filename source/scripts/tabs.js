import {showCaseInit, showMoreFunc} from './show-more.js';

const tabsInit = (blockClass) => {
  const block = document.querySelector(`.${blockClass}`);
  if(!block) {
    return;
  }

  const buttonsTab = block.querySelectorAll(`.${blockClass}__button-tab`);
  const tabsBlock = block.querySelectorAll(`.${blockClass}__list`);
  const showButton = block.querySelector(`.${blockClass}__show-more-button`);

  tabsBlock.forEach((el, i) => {
    if(i === 0) {
      el.classList.add(`${blockClass}__list--active`);
      showCaseInit(el, showButton);
    }
  });
  buttonsTab.forEach((el, i) => {
    if(i === 0) {
      el.classList.add('button--tab-active');
    }
  });

  block.addEventListener('click', (e) => {
    if(e.target.closest(`.${blockClass}__button-tab`)) {
      buttonsTab.forEach((el) => {
        el.classList.remove('button--tab-active');
      });
      tabsBlock.forEach((el) => {
        el.classList.remove(`${blockClass}__list--active`);
      });

      tabsBlock.forEach((blk) => {
        if(e.target.closest(`.${blockClass}__button-tab`).dataset.tab === blk.dataset.tab) {
          blk.classList.add(`${blockClass}__list--active`);
          e.target.closest(`.${blockClass}__button-tab`).classList.add('button--tab-active');
          showCaseInit(blk, showButton);
        }
      });
    }
    if(e.target.closest(`.${blockClass}__show-more-button`)) {
      tabsBlock.forEach((blk) => {
        if(blk.classList.contains(`${blockClass}__list--active`)) {
          showMoreFunc(blk, showButton);
        }
      });
    }
  });
};

export { tabsInit };
