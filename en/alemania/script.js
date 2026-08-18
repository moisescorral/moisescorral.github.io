const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const hackedPhrases = [
  'NO ES UN MANUAL. ES UNA ADVERTENCIA.',
  'ELLOS REESCRIBEN. NOSOTROS RECORDAMOS.',
  'LA VERDAD NO PUEDE SER BORRADA.'
];

const note = document.querySelector('.hero .resistance-note');
let phraseIndex = 0;

if (note) {
  setInterval(() => {
    phraseIndex = (phraseIndex + 1) % hackedPhrases.length;
    note.textContent = hackedPhrases[phraseIndex];
  }, 4200);
}
