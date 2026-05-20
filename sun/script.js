
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.chapter-card').forEach(card => {

  card.addEventListener('click', () => {

    card.classList.toggle('flipped');

  });

});