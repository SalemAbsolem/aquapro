(function(u,d){typeof exports=="object"&&typeof module<"u"?module.exports=d():typeof define=="function"&&define.amd?define(d):(u=typeof globalThis<"u"?globalThis:u||self).Pristine=d()})(void 0,function(){"use strict";var u={en:{required:"This field is required",email:"This field requires a valid e-mail address",number:"This field requires a number",integer:"This field requires an integer value",url:"This field requires a valid website URL",tel:"This field requires a valid telephone number",maxlength:"This fields length must be < ${1}",minlength:"This fields length must be > ${1}",min:"Minimum value for this field is ${1}",max:"Maximum value for this field is ${1}",pattern:"Please match the requested format",equals:"The two fields do not match"}};function d(t){var l=arguments;return this.replace(/\${([^{}]*)}/g,function(c,r){return l[r]})}function q(t){return t.pristine.self.form.querySelectorAll('input[name="'+t.getAttribute("name")+'"]:checked').length}var C={classTo:"form-group",errorClass:"has-danger",successClass:"has-success",errorTextParent:"form-group",errorTextTag:"div",errorTextClass:"text-help"},_=["required","min","max","minlength","maxlength","pattern"],k=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,I=/-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/,m="en",E={},p=function(t,l){l.name=t,l.priority===void 0&&(l.priority=1),E[t]=l};function T(t,l,c){var r=this;function v(e,s,o,i){var n=E[o];if(n&&(e.push(n),i)){var a=o==="pattern"?[i]:i.split(",");a.unshift(null),s[o]=a}}function M(e){for(var s=[],o=!0,i=0;e.validators[i];i++){var n=e.validators[i],a=e.params[n.name]?e.params[n.name]:[];if(a[0]=e.input.value,!n.fn.apply(e.input,a)&&(o=!1,typeof n.msg=="function"?s.push(n.msg(e.input.value,a)):typeof n.msg=="string"?s.push(d.apply(n.msg,a)):n.msg===Object(n.msg)&&n.msg[m]?s.push(d.apply(n.msg[m],a)):e.messages[m]&&e.messages[m][n.name]?s.push(d.apply(e.messages[m][n.name],a)):u[m]&&u[m][n.name]&&s.push(d.apply(u[m][n.name],a)),n.halt===!0))break}return e.errors=s,o}function A(e){if(e.errorElements)return e.errorElements;var s=function(n,a){for(;(n=n.parentElement)&&!n.classList.contains(a););return n}(e.input,r.config.classTo),o=null,i=null;return(o=r.config.classTo===r.config.errorTextParent?s:s.querySelector("."+r.config.errorTextParent))&&((i=o.querySelector(".pristine-error"))||((i=document.createElement(r.config.errorTextTag)).className="pristine-error "+r.config.errorTextClass,o.appendChild(i),i.pristineDisplay=i.style.display)),e.errorElements=[s,i]}function w(e){var s=A(e),o=s[0],i=s[1];o&&(o.classList.remove(r.config.successClass),o.classList.add(r.config.errorClass)),i&&(i.innerHTML=e.errors.join("<br/>"),i.style.display=i.pristineDisplay||"")}function N(e){var s=function(o){var i=A(o),n=i[0],a=i[1];return n&&(n.classList.remove(r.config.errorClass),n.classList.remove(r.config.successClass)),a&&(a.innerHTML="",a.style.display="none"),i}(e)[0];s&&s.classList.add(r.config.successClass)}return function(e,s,o){e.setAttribute("novalidate","true"),r.form=e,r.config=function(i,n){for(var a in n)a in i||(i[a]=n[a]);return i}(s||{},C),r.live=o!==!1,r.fields=Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function(i){var n=[],a={},h={};return[].forEach.call(i.attributes,function(f){if(/^data-pristine-/.test(f.name)){var g=f.name.substr(14),x=g.match(I);if(x!==null){var L=x[1]===void 0?"en":x[1];return h.hasOwnProperty(L)||(h[L]={}),void(h[L][g.slice(0,g.length-x[0].length)]=f.value)}g==="type"&&(g=f.value),v(n,a,g,f.value)}else~_.indexOf(f.name)?v(n,a,f.name,f.value):f.name==="type"&&v(n,a,f.value)}),n.sort(function(f,g){return g.priority-f.priority}),r.live&&i.addEventListener(~["radio","checkbox"].indexOf(i.getAttribute("type"))?"change":"input",function(f){r.validate(f.target)}.bind(r)),i.pristine={input:i,validators:n,params:a,messages:h,self:r}}.bind(r))}(t,l,c),r.validate=function(e,s){s=e&&s===!0||e===!0;var o=r.fields;e!==!0&&e!==!1&&(e instanceof HTMLElement?o=[e.pristine]:(e instanceof NodeList||e instanceof(window.$||Array)||e instanceof Array)&&(o=Array.from(e).map(function(h){return h.pristine})));for(var i=!0,n=0;o[n];n++){var a=o[n];M(a)?!s&&N(a):(i=!1,!s&&w(a))}return i},r.getErrors=function(e){if(!e){for(var s=[],o=0;o<r.fields.length;o++){var i=r.fields[o];i.errors.length&&s.push({input:i.input,errors:i.errors})}return s}return e.tagName&&e.tagName.toLowerCase()==="select"?e.pristine.errors:e.length?e[0].pristine.errors:e.pristine.errors},r.addValidator=function(e,s,o,i,n){e instanceof HTMLElement?(e.pristine.validators.push({fn:s,msg:o,priority:i,halt:n}),e.pristine.validators.sort(function(a,h){return h.priority-a.priority})):console.warn("The parameter elem must be a dom element")},r.addError=function(e,s){(e=e.length?e[0]:e).pristine.errors.push(s),w(e.pristine)},r.reset=function(){for(var e=0;r.fields[e];e++)r.fields[e].errorElements=null;Array.from(r.form.querySelectorAll(".pristine-error")).map(function(s){s.parentNode.removeChild(s)}),Array.from(r.form.querySelectorAll("."+r.config.classTo)).map(function(s){s.classList.remove(r.config.successClass),s.classList.remove(r.config.errorClass)})},r.destroy=function(){r.reset(),r.fields.forEach(function(e){delete e.input.pristine}),r.fields=[]},r.setGlobalConfig=function(e){C=e},r}return p("text",{fn:function(t){return!0},priority:0}),p("required",{fn:function(t){return this.type==="radio"||this.type==="checkbox"?q(this):t!==void 0&&t!==""},priority:99,halt:!0}),p("email",{fn:function(t){return!t||k.test(t)}}),p("number",{fn:function(t){return!t||!isNaN(parseFloat(t))},priority:2}),p("integer",{fn:function(t){return!t||/^\d+$/.test(t)}}),p("minlength",{fn:function(t,l){return!t||t.length>=parseInt(l)}}),p("maxlength",{fn:function(t,l){return!t||t.length<=parseInt(l)}}),p("min",{fn:function(t,l){return!t||(this.type==="checkbox"?q(this)>=parseInt(l):parseFloat(t)>=parseFloat(l))}}),p("max",{fn:function(t,l){return!t||(this.type==="checkbox"?q(this)<=parseInt(l):parseFloat(t)<=parseFloat(l))}}),p("pattern",{fn:function(t,l){var c=l.match(new RegExp("^/(.*?)/([gimy]*)$"));return!t||new RegExp(c[1],c[2]).test(t)}}),p("equals",{fn:function(t,l){var c=document.querySelector(l);return c&&(!t&&!c.value||c.value===t)}}),T.addValidator=function(t,l,c,r,v){p(t,{fn:l,msg:c,priority:r,halt:v})},T.addMessages=function(t,l){var c=u.hasOwnProperty(t)?u[t]:u[t]={};Object.keys(l).forEach(function(r,v){c[r]=l[r]})},T.setLocale=function(t){m=t},T});var y=document.querySelector("form.form-consult"),$=y.querySelector("input#name"),S=y.querySelector("input#email"),P=y.querySelector("input#phone"),F={classTo:"form-consult__wrap-input",errorClass:"form-consult__wrap-input--error",errorTextParent:"form-consult__wrap-input",errorTextTag:"span",errorTextClass:"form-consult__error-text"},b=new Pristine(y,F);b.addValidator($,u=>u.length>0,`\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 ${$.name}`);b.addValidator(S,u=>u.length>0,`\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 ${S.name}`);b.addValidator(P,u=>u.length>0,`\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 ${P.name}`);y.addEventListener("submit",u=>{u.preventDefault(),b.validate()&&y.submit()});
