var t=document.querySelectorAll(".how-we-work__item"),s=(e,r)=>{e.forEach(o=>{o.isIntersecting&&(o.target.classList.add("how-we-work--animate-arrow"),r.unobserve(o.target))})},n={rootMargin:"0px 0px -50% 0px",threshold:0},a=new IntersectionObserver(s,n);t.length>0&&t.forEach(e=>a.observe(e));
