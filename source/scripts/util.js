const slideStartActiveClass = (block) => {
  if(!block) {
    return;
  }
  const buttonPrev = block.querySelector('.quiz__button--prev');
  const buttonNext = block.querySelector('.quiz__button--next');
  const textButton = buttonNext.querySelector('.button__text');
  const slideStart = block.querySelector('.quiz__slide--start');
  const activeClass = 'quiz__slide--active';

  if(!buttonPrev || !slideStart) {
    return;
  }

  const startTrack = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.target.classList.contains(activeClass)) {
        buttonPrev.style.display = 'none';
        textButton.textContent = 'Начать';
      } else {
        buttonPrev.style.display = null;
        textButton.textContent = 'Далее';
      }
    }
  };

  const config = {
    attributes: true,
  };

  const trackerStart = new MutationObserver(startTrack);

  trackerStart.observe(slideStart, config);
};

const slideFinalActiveClass = (block) => {
  if(!block) {
    return;
  }
  const buttonNext = block.querySelector('.quiz__button--next');
  const slideFinal = block.querySelector('.quiz__slide--final');
  const activeClass = 'quiz__slide--active';

  if(!buttonNext || !slideFinal) {
    return;
  }

  const finalTrack = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.target.classList.contains(activeClass)) {
        buttonNext.style.display = 'none';
      } else {
        buttonNext.style.display = null;
      }
    }
  };

  const config = {
    attributes: true,
  };

  const trackerFinal = new MutationObserver(finalTrack);

  trackerFinal.observe(slideFinal, config);
};

const makeElement = (tagName, params) => {
  const element = document.createElement(tagName);
  if(typeof params === 'object') {
    if(params.className) {
      element.classList.add(params.className);
    }

    Object.entries(params).forEach(([key, value]) => {
      element[key] = value;
    });
  }

  return element;
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdFromRangeGenerator = (min, max, random = false) => {
  const previousValues = [];

  return function () {
    let currentValue;
    if(random) {
      currentValue = getRandomInteger(min, max);
    } else {
      if(previousValues.length === 0) {
        currentValue = 1;
      } else {
        currentValue = previousValues[previousValues.length - 1];
      }
    }
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      if(random) {
        currentValue = getRandomInteger(min, max);
      } else {
        if(previousValues.length === 0) {
          currentValue = 1;
        } else {
          currentValue = previousValues[previousValues.length - 1] + 1;
        }
      }
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

export { slideStartActiveClass, slideFinalActiveClass, makeElement, createIdFromRangeGenerator };
