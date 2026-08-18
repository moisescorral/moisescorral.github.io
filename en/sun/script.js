document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const cards = document.querySelectorAll('.chapter-card');

  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    const toggleCard = event => {
      event.preventDefault();
      event.stopPropagation();

      const isFlipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
    };

    if (window.PointerEvent) {
      card.addEventListener('pointerup', toggleCard);
    } else {
      card.addEventListener('touchend', toggleCard, { passive: false });
      card.addEventListener('click', toggleCard);
    }

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        toggleCard(event);
      }
    });
  });
});
