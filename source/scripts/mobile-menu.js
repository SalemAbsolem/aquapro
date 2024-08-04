import { NOT_DESKTOP } from './constants.js';

if(NOT_DESKTOP.matches) {
  const header = document.querySelector('.header');
  const openMenuBtn = header.querySelector('.header__button-menu');

  openMenuBtn.addEventListener('click', () => {
    if(header.classList.contains('header--menu-open')) {
      header.classList.remove('header--menu-open');
    } else {
      header.classList.add('header--menu-open');
    }
  });
}
