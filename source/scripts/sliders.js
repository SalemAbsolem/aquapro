import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

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
