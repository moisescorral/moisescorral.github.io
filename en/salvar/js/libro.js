(function(){
  'use strict';
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const header=$('#bookHeader'), progress=$('#readingProgress');
  function onScroll(){const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;header.classList.toggle('compact',y>70);progress.style.width=(max?y/max*100:0)+'%'}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});$$('.reveal').forEach(el=>observer.observe(el));
  const menu=$('#bookMenu'),mobileNav=$('#mobileBookNav');
  function setMenu(open){mobileNav.classList.toggle('open',open);mobileNav.setAttribute('aria-hidden',String(!open));menu.setAttribute('aria-expanded',String(open))}
  menu.addEventListener('click',()=>setMenu(!mobileNav.classList.contains('open')));$$('a',mobileNav).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  const form=$('#bookForm');
  form.addEventListener('submit',async e=>{
    e.preventDefault();const data=new FormData(form),status=$('#bookFormStatus'),button=form.querySelector('button');if(data.get('_gotcha'))return;
    data.set('fecha_solicitud',new Date().toISOString());button.disabled=true;status.classList.remove('error');status.textContent='REGISTRANDO AVISO…';
    try{const response=await fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:data});if(!response.ok)throw new Error();status.textContent='REGISTRO COMPLETADO. TE AVISAREMOS.';form.reset()}
    catch(_){status.classList.add('error');status.textContent='NO SE HA PODIDO ENVIAR. INTÉNTALO DE NUEVO.';button.disabled=false}
  });
})();
