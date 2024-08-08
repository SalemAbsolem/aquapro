import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { MOBILE_ONLY, TABLET_ONLY } from './constants.js';

const makeVideoBg = (src) => {
  const source = `<source type="video/mp4" src="${src}">`;

  return source;
};

const videoSlideInit = (sliderClass, slideClass, mobile, tablet) => {
  const slider = document.querySelector(`.${sliderClass}`);
  const videoSlide = slider.querySelectorAll(`.${slideClass}--video`);


  for(let i = 0; i < videoSlide.length; i++) {
    const backgroundSlides = videoSlide[i].querySelector(`.${slideClass}__background-wrap`);
    const video = backgroundSlides.querySelector('video');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');

    if(mobile.matches || tablet.matches) {
      video.innerHTML = makeVideoBg(backgroundSlides.dataset.videoVerticalSrc);
    } else {
      video.innerHTML = makeVideoBg(backgroundSlides.dataset.videoHorizontalSrc);
    }
  }
};

const projectSliderInit = () => {
  const projectSlider = document.querySelector('.project');
  if(!projectSlider) {
    return;
  }
  const sliders = projectSlider.querySelectorAll('.project__slide');
  const loop = (sliders.length > 3);

  new Swiper('.project', {
    modules: [Autoplay, Navigation],
    wrapperClass: 'project__slider',
    slideClass: 'project__slide',
    navigation: {
      nextEl: '.project__slide-button--slide-next',
      prevEl: '.project__slide-button--slide-prev',
    },
    speed: 1000,
    loop: loop,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
};

const heroSliderInit = () => {
  const heroSlider = document.querySelector('.hero-slider__content');
  if(!heroSlider) {
    return;
  }

  videoSlideInit('hero-slider__content', 'hero-slide', MOBILE_ONLY, TABLET_ONLY);

  new Swiper('.hero-slider__content', {
    modules: [Autoplay, Pagination],
    wrapperClass: 'hero-slider__list',
    slideClass: 'hero-slide',
    speed: 1000,
    loop: true,
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.pagination',
      bulletClass: 'pagination__bullet',
      bulletActiveClass: 'pagination__bullet--active',
      clickable: true,
    },
  });
};

export { projectSliderInit, heroSliderInit };
