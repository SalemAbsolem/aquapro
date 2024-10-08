const socialHover = (media) => {
  if(media.matches) {
    document.addEventListener('mouseover', (e) => {
      if(e.target.classList.contains('social__link')) {
        e.target.style.backgroundColor = e.target.dataset.hoverColor;
      }
    });
    document.addEventListener('mouseout', (e) => {
      if(e.target.classList.contains('social__link')) {
        e.target.style.backgroundColor = null;
      }
    });
  }
};

export { socialHover };
