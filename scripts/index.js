var a=window.matchMedia("(max-width: 767.98px)"),t=window.matchMedia("(max-width: 1199.98px)"),o=window.matchMedia("(hover: hover)");if(t.matches){let e=document.querySelector(".header");e.querySelector(".header__button-menu").addEventListener("click",()=>{e.classList.contains("header--menu-open")?e.classList.remove("header--menu-open"):e.classList.add("header--menu-open")})}o.matches&&(document.addEventListener("mouseover",e=>{e.target.classList.contains("social__link")&&(e.target.style.backgroundColor=e.target.dataset.hoverColor)}),document.addEventListener("mouseout",e=>{e.target.classList.contains("social__link")&&(e.target.style.backgroundColor=null)}));
