var d=window.matchMedia("(max-width: 767.98px)"),u=window.matchMedia("(min-width: 768px) and (max-width: 1199.98px)"),f=window.matchMedia("(min-width: 1199.98px)"),h=window.matchMedia("(max-width: 1199.98px)"),_=window.matchMedia("(hover: hover)"),m=document.querySelector("header.header"),y=document.querySelector("main.main"),p=document.querySelector("footer.footer"),E=window.innerWidth,c=f.matches?4:2;var r=(t,i)=>{let s=[],n=t.childNodes;n.forEach.call(n,o=>{o.nodeName.indexOf("#")===-1&&s.push(o)}),s.length>c?(s.forEach((o,e)=>{e>c-1?o.style.display="none":o.style.display="flex"}),i.style.display="flex"):i.style.display="none"},l=(t,i)=>{let s=[],n=t.childNodes;n.forEach.call(n,a=>{a.nodeName.indexOf("#")===-1&&s.push(a)}),s.forEach(a=>{a.style.display="flex"}),i.style.display="none"};var v=t=>{let i=document.querySelector(`.${t}`);if(!i)return;let s=i.querySelectorAll(`.${t}__button-tab`),n=i.querySelectorAll(`.${t}__list`),a=i.querySelector(`.${t}__show-more-button`);n.forEach((o,e)=>{e===0&&(o.classList.add(`${t}__list--active`),r(o,a))}),s.forEach((o,e)=>{e===0&&o.classList.add("button--tab-active")}),i.addEventListener("click",o=>{o.target.closest(`.${t}__button-tab`)&&(s.forEach(e=>{e.classList.remove("button--tab-active")}),n.forEach(e=>{e.classList.remove(`${t}__list--active`)}),n.forEach(e=>{o.target.closest(`.${t}__button-tab`).dataset.tab===e.dataset.tab&&(e.classList.add(`${t}__list--active`),o.target.closest(`.${t}__button-tab`).classList.add("button--tab-active"),r(e,a))})),o.target.closest(`.${t}__show-more-button`)&&n.forEach(e=>{e.classList.contains(`${t}__list--active`)&&l(e,a)})})};export{v as tabsInit};
