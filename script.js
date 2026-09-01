const menu=document.querySelector('.mobile-menu');
document.querySelector('.menu-toggle')?.addEventListener('click',()=>menu.classList.add('open'));
document.querySelector('.menu-close')?.addEventListener('click',()=>menu.classList.remove('open'));
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

document.addEventListener('mousemove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')});

const modal=document.getElementById('certificateModal');
const image=document.getElementById('certImage');
const pdf=document.getElementById('certPdf');
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');image.src='';pdf.src=''};
document.querySelectorAll('.certificate-open').forEach(card=>card.addEventListener('click',()=>{
  image.classList.remove('active');pdf.classList.remove('active');
  if(card.dataset.type==='pdf'){pdf.src=card.dataset.file;pdf.classList.add('active')}
  else{image.src=card.dataset.file;image.classList.add('active')}
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');
}));
document.getElementById('modalClose')?.addEventListener('click',closeModal);
modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const form=document.getElementById('contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent('Portfolio enquiry from '+data.get('name'));const body=encodeURIComponent('Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\n\n'+data.get('message'));window.location.href=`mailto:aaru54714@gmail.com?subject=${subject}&body=${body}`});

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>observer.observe(s));
