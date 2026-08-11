(function(){
  'use strict';
  const $=(s,p=document)=>p.querySelector(s); const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const body=document.body, topbar=$('#topbar'), progress=$('#progressBar');
  function onScroll(){
    const y=window.scrollY; topbar.classList.toggle('compact',y>80);
    const max=document.documentElement.scrollHeight-innerHeight; progress.style.width=(max?y/max*100:0)+'%';
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  const revealObserver=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  $$('.reveal').forEach(el=>revealObserver.observe(el));

  const menu=$('#mobileMenu'), menuButton=$('#menuButton'), menuClose=$('#menuClose');
  function setMenu(open){menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));menuButton.setAttribute('aria-expanded',String(open));body.style.overflow=open?'hidden':''}
  menuButton.addEventListener('click',()=>setMenu(true)); menuClose.addEventListener('click',()=>setMenu(false)); $$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));

  const sound=$('#soundButton'); sound.addEventListener('click',()=>{const on=sound.classList.toggle('on');$('b',sound).textContent=on?'ON':'OFF';toast(on?'Ambiente de CONTINUUM activado':'Ambiente silenciado')});
  const toastEl=$('#toast'); let toastTimer; function toast(text){toastEl.textContent=text;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2600)}

  $('#thomasButton').addEventListener('click',()=>{
    $('#thomasCard').classList.add('corrupt'); const answer=$('#thomasAnswer'); answer.textContent='RESPUESTA AUTOMÁTICA: No preguntes por Campo la Carrera. — T.';
    body.classList.add('degrading'); setTimeout(()=>{$('#thomasCard').classList.remove('corrupt')},900);
  });

  const form=$('#reservationForm');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const formData=new FormData(form), status=$('#formStatus'), button=form.querySelector('button[type="submit"]');
    if(formData.get('_honey'))return;
    const name=formData.get('name').toString().trim().split(/\s+/)[0];
    const payload=Object.fromEntries(formData.entries());
    payload.consentimiento_novedades=$('#bookConsent').checked?'Sí':'No';
    payload.fecha_solicitud=new Date().toISOString();
    button.disabled=true;button.classList.add('sending');status.classList.remove('error');status.textContent='TRANSMITIENDO SOLICITUD…';
    try{
      const endpoint=form.action.replace('https://formsubmit.co/','https://formsubmit.co/ajax/');
      const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
      const result=await response.json();
      if(!response.ok||result.success===false)throw new Error('Submission failed');
      status.textContent='SOLICITUD '+Math.floor(10000+Math.random()*89999)+' REGISTRADA. BIENVENIDO/A, '+name.toUpperCase()+'.';
      $('#spots').textContent='126';toast('El Directorio ha recibido tu solicitud');form.reset();body.classList.add('degrading');
    }catch(error){
      status.classList.add('error');status.textContent='NO SE HA PODIDO ENVIAR. REVISA TU CONEXIÓN E INTÉNTALO DE NUEVO.';button.disabled=false;
    }finally{button.classList.remove('sending')}
  });

  const breach=$('#breach'), bButton=$('#breachButton'), iBar=$('#integrityBar'), iVal=$('#integrityValue'), sMsg=$('#systemMessage'), bTitle=$('.breach-title'), bHidden=$('#breachHidden'); let breachStarted=false;
  const breachObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!breachStarted){breachStarted=true;runBreach()}}),{threshold:.55}); breachObserver.observe(breach);
  const stages=[
    {t:600,v:94,msg:'SINCRONIZANDO ARCHIVOS PÚBLICOS…'},
    {t:1500,v:81,msg:'ADVERTENCIA: DUPLICIDAD EN ARCHIVO JD-4471'},
    {t:2500,v:63,msg:'INTENTANDO CORREGIR MEMORIA…'},
    {t:3500,v:37,msg:'ACCESO NO AUTORIZADO: /CAMPO_LA_CARRERA'},
    {t:4600,v:12,msg:'LA VERSIÓN OFICIAL NO ES LA HISTORIA COMPLETA'}
  ];
  function runBreach(){body.classList.add('degrading');stages.forEach(stage=>setTimeout(()=>{iBar.style.width=stage.v+'%';iBar.style.background=stage.v<50?'#ff6b5c':'#7ce7ff';iVal.textContent=stage.v+'%';sMsg.textContent=stage.msg;if(stage.v===37){breach.classList.add('active');bTitle.dataset.text='NO MIRES ARRIBA.';bTitle.textContent='NO MIRES ARRIBA.';bHidden.textContent='Thomas dejó una copia debajo del sistema.'}if(stage.v===12){bTitle.dataset.text='RECUPERA LA VERDAD.';bTitle.textContent='RECUPERA LA VERDAD.';bHidden.textContent='Archivo CLC-07 localizado. Integridad parcial.';bButton.disabled=false}},stage.t))}

  bButton.addEventListener('click',()=>{const campo=$('#campo');campo.classList.add('open');campo.setAttribute('aria-hidden','false');$('#continuum').style.display='none';scrollTo(0,0);history.pushState({campo:true},'', '#campo');toast('Archivo CLC-07 recuperado')});
  $('#returnButton').addEventListener('click',()=>{const campo=$('#campo');campo.classList.remove('open');campo.setAttribute('aria-hidden','true');$('#continuum').style.display='block';scrollTo(0,$('#breach').offsetTop);history.replaceState({},'', '#breach')});
  addEventListener('popstate',()=>{if(location.hash!=='#campo'&&$('#campo').classList.contains('open'))$('#returnButton').click()});

  $$('.faq-corrupt').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&body.classList.contains('degrading')){const p=$('.glitch-copy',d);p.textContent=p.dataset.corrupt}}));
})();
