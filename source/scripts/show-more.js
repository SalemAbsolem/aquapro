import { PORTFOLIO_CASE } from './constants.js';

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

export {showCaseInit, showMoreFunc};
