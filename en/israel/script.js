const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));
document.addEventListener('DOMContentLoaded', () => {

  const timelineToggles = document.querySelectorAll('.timeline-toggle');

  timelineToggles.forEach(toggle => {

    toggle.addEventListener('click', () => {

      const item = toggle.closest('.timeline-item');

      item.classList.toggle('open');

      const label = toggle.querySelector('.timeline-more');

      if(item.classList.contains('open')){
        label.textContent = 'Ocultar capítulos';
      } else {
        label.textContent = 'Ver capítulos';
      }

    });

  });

});