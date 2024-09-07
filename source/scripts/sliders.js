import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { MOBILE_ONLY, TABLET_ONLY } from './constants.js';
import { showMoreQuiz } from './show-more.js';
import { slideStartActiveClass, slideFinalActiveClass } from './util.js';
import { firstSlideGenerate, serviceSlideGenerate, stepTwoSlideGenerate, branchSlideGenerate } from './quiz-generator.js';
import { quizValidate } from './validator-form.js';

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

const quizSliderInit = () => {
  const quizBlock = document.querySelector('.quiz');
  if(!quizBlock) {
    return;
  }

  const nextBtn = quizBlock.querySelector('.quiz__button--next');
  const prevBtn = quizBlock.querySelector('.quiz__button--prev');

  firstSlideGenerate(quizBlock.querySelector('form'));
  serviceSlideGenerate(quizBlock.querySelector('form'));

  const slider = new Swiper(/*'.wpcf7'*/'.quiz__container', {
    modules: [Pagination, Navigation],
    wrapperClass: 'wpcf7-form',
    slideClass: 'quiz__slide',
    slideActiveClass: 'quiz__slide--active',
    speed: 500,
    // navigation: {
    //   nextEl: '.quiz__button--next',
    //   prevEl: '.quiz__button--prev',
    // },
    pagination: {
      el: '.quiz__pagination',
      progressbarFillClass: 'quiz__pagination-fill',
      type: 'progressbar',
    },
    spaceBetween: 20,
  });

  slideStartActiveClass(quizBlock);

  let renderedStepTwo = false;
  let renderedBranch = false;

  const service = quizBlock.querySelector('.quiz__input[value="service"]');
  const build = quizBlock.querySelector('.quiz__input[value="build"]');

  if(service) {
    service.addEventListener('change', (e) => {
      if(e.target.checked) {
        if(quizBlock.querySelector('[data-slide="build"]')) {
          quizBlock.querySelector('[data-slide="build"]').remove();

          renderedStepTwo = false;
        }
        if(quizBlock.querySelectorAll('[data-slide*="build-"]').length > 0) {
          quizBlock.querySelectorAll('[data-slide*="build-"]').forEach((el) => el.remove());

          renderedBranch = false;
        }
        if(!renderedStepTwo) {
          stepTwoSlideGenerate(quizBlock.querySelector('form'), service);
          renderedStepTwo = true;

          if(renderedStepTwo) {
            const serviceBranch = quizBlock.querySelector(`.quiz__input[id*="${service.id}-"]`);

            if(serviceBranch) {
              if(!renderedBranch) {
                branchSlideGenerate(quizBlock.querySelector('form'), service.id);
                renderedBranch = true;
              }

              slider.updateProgress();
              slider.updateSlides();
              slideFinalActiveClass(quizBlock);
              quizValidate(quizBlock.querySelector('form'));
            }
          }
        }
        slider.updateProgress();
        slider.updateSlides();
      }
    });
  }

  if(build) {
    build.addEventListener('change', (e) => {
      if(e.target.checked) {
        if(quizBlock.querySelector('[data-slide="service"]')) {
          quizBlock.querySelector('[data-slide="service"]').remove();

          renderedStepTwo = false;
        }
        if(quizBlock.querySelectorAll('[data-slide="service"]').length > 0) {
          quizBlock.querySelectorAll('[data-slide="service"]').forEach((el) => el.remove());

          renderedBranch = false;
        }
        if(quizBlock.querySelectorAll('[data-slide*="build-"]').length > 0) {
          quizBlock.querySelectorAll('[data-slide*="build-"]').forEach((el) => el.remove());

          renderedBranch = false;
        }
        if(!renderedStepTwo) {
          stepTwoSlideGenerate(quizBlock.querySelector('form'), build);
          renderedStepTwo = true;

          const buildBranch = quizBlock.querySelectorAll(`.quiz__input[value*="${build.value}-"]`);
          if(buildBranch.length > 0) {
            buildBranch.forEach((elem) => {
              elem.addEventListener('change', (evt) => {

                if(evt.target.checked) {
                  if(quizBlock.querySelectorAll(`[data-slide*="${build.value}-"]`).length > 0) {
                    quizBlock.querySelectorAll(`[data-slide*="${build.value}-"]`).forEach((el) => el.remove());

                    renderedBranch = false;
                  }
                  if(!renderedBranch) {
                    branchSlideGenerate(quizBlock.querySelector('form'), elem);
                    renderedBranch = true;
                  }
                }
                slider.updateProgress();
                slider.updateSlides();
                slideFinalActiveClass(quizBlock);
                quizValidate(quizBlock.querySelector('form'));
              });
            });
          }
        }
        slider.updateProgress();
        slider.updateSlides();
      }
    });
  }

  showMoreQuiz();

  nextBtn.addEventListener('click', () => {
    const activeSlide = quizBlock.querySelector('.quiz__slide--active');
    const radioInputs = activeSlide.querySelectorAll('.quiz__input--radio');
    const radioIcons = activeSlide.querySelectorAll('.quiz__label-icon');


    if(radioInputs.length > 0) {
      const checked = [];
      radioInputs.forEach((el) => {
        checked.push(el.checked);
      });

      if (checked.find((el) => el === true)) {
        radioIcons.forEach((el) => {
          el.classList.remove('quiz__label-icon--error');
        });
        slider.slideNext();
      } else {
        radioIcons.forEach((el) => {
          el.classList.add('quiz__label-icon--error');
        });
      }
    } else {
      slider.slideNext();
    }
  });

  prevBtn.addEventListener('click', () => {
    slider.slidePrev();
  });
};

export { projectSliderInit, heroSliderInit, quizSliderInit };
