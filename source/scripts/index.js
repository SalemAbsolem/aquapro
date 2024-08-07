import {
  MOBILE_ONLY, TABLET_ONLY, NOT_DESKTOP,
  HOVER,
  HEADER, MAIN, FOOTER,
  WIDTH_SCREEN
} from './constants.js';

import { scalingPage } from './scale-page.js';
scalingPage(WIDTH_SCREEN, MOBILE_ONLY, TABLET_ONLY, NOT_DESKTOP, HEADER, MAIN, FOOTER);

import { openMobileMenu } from './mobile-menu.js';
openMobileMenu(NOT_DESKTOP, HEADER);

import { socialHover } from './social-icon.js';
socialHover(HOVER);

import { tabsInit } from './tabs.js';
tabsInit('portfolio');

import { heroSliderInit, projectSliderInit } from './sliders.js';
// window.addEventListener('load', () => {
heroSliderInit();
projectSliderInit();
// });

import './validator-form.js';
