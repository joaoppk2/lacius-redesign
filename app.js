const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', String(menu.classList.toggle('open')));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelectorAll('.module-demo').forEach(button => {
  button.addEventListener('click', () => {
    const example = document.querySelector(`#exemplo-${button.dataset.view}`);
    example.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    example.querySelector('h3').focus({ preventScroll: true });
  });
});
