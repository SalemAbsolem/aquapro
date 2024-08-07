/* --- МЕДИА-ЗАПРОСЫ --- */
const MOBILE_ONLY = window.matchMedia('(max-width: 767.98px)');
const TABLET_ONLY = window.matchMedia('(min-width: 768px) and (max-width: 1199.98px)');
const DESKTOP_ONLY = window.matchMedia('(min-width: 1199.98px)');
const NOT_DESKTOP = window.matchMedia('(max-width: 1199.98px)');

const HOVER = window.matchMedia('(hover: hover)');

/* --- ОСНОВНЫЕ ЭЛЕМЕНТЫ --- */
const HEADER = document.querySelector('header.header');
const MAIN = document.querySelector('main.main');
const FOOTER = document.querySelector('footer.footer');

/* --- ВЕЛЕЧИНЫ --- */
const WIDTH_SCREEN = window.innerWidth;
const PORTFOLIO_CASE = (DESKTOP_ONLY.matches) ? 4 : 2;

export {
  MOBILE_ONLY, TABLET_ONLY, NOT_DESKTOP,
  HOVER,
  HEADER, MAIN, FOOTER,
  WIDTH_SCREEN, PORTFOLIO_CASE
};
