const scalingPage = (windowWidth, mobile, tablet, noDesktop, header, main, footer) => {
  let baseWidth;
  if(mobile.matches) {
    baseWidth = 320;
  } else if (tablet.matches) {
    baseWidth = 768;
  }

  const scale = windowWidth / baseWidth;

  if(noDesktop.matches) {
    if(document.body.querySelector('.body__container') && scale >= 1) {
      document.body.querySelector('.body__container').setAttribute('style', `zoom: ${scale}`);
    } else {
      if(header && scale >= 1) {
        header.setAttribute('style', `zoom: ${scale}`);
      }

      if(main && scale >= 1) {
        main.setAttribute('style', `zoom: ${scale}`);
      }

      if(footer && scale >= 1) {
        footer.setAttribute('style', `zoom: ${scale}`);
      }
    }
  }
};

export { scalingPage };
