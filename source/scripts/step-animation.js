const items = document.querySelectorAll('.how-we-work__item');

const addAnimate = (entries, observ) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('how-we-work--animate-arrow');
      observ.unobserve(entry.target);
    }
  });
};

const options = {
  rootMargin: '0px 0px -50% 0px',
  threshold: 0,
};

const observer = new IntersectionObserver(addAnimate, options);

if(items.length > 0) {
  items.forEach((item) => observer.observe(item));
}
