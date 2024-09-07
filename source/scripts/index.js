import {
  MOBILE_ONLY, TABLET_ONLY, NOT_DESKTOP,
  HOVER,
  HEADER, MAIN, FOOTER,
  WIDTH_SCREEN
} from './constants.js';

import { scalingPage } from './scale-page.js';
scalingPage(WIDTH_SCREEN, MOBILE_ONLY, TABLET_ONLY, NOT_DESKTOP, HEADER, MAIN, FOOTER);

import { checkCookies } from './messages.js';
checkCookies();

import { openMobileMenu } from './mobile-menu.js';
openMobileMenu(NOT_DESKTOP, HEADER);

import { socialHover } from './social-icon.js';
socialHover(HOVER);

import { tabsInit } from './tabs.js';
tabsInit('portfolio');

import './quiz-generator.js';

import { heroSliderInit, projectSliderInit, quizSliderInit } from './sliders.js';
heroSliderInit();
projectSliderInit();
quizSliderInit();

import './validator-form.js';

import { showMoreArticle } from './show-more.js';

const article = document.querySelector('.more-articles');
if(article) {
  const list = article.querySelectorAll('.more-articles__item');
  const button = article.querySelector('.more-articles__button-more');

  showMoreArticle(list, button);
}

const blog = document.querySelector('.blog');
if(blog) {
  const list = blog.querySelectorAll('.blog__item');
  const button = blog.querySelector('.blog__button-more');

  showMoreArticle(list, button);
}

import './step-animation.js';
