const openMobileMenu = (media, block) => {
  if(media.matches && block) {
    const openMenuBtn = block.querySelector('.header__button-menu');

    openMenuBtn.addEventListener('click', () => {
      if(block.classList.contains('header--menu-open')) {
        block.classList.remove('header--menu-open');
      } else {
        block.classList.add('header--menu-open');
      }
    });
  }
};

export {openMobileMenu};
