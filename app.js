const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function reveal(element) {
  if (!reducedMotion.matches) element.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' });
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
});

const selector = document.querySelector('.module-selector');
const suggestions = {
  documentar: 'Documentos, Registros e Treinamentos: um ponto de partida para organizar informações e capacitação.',
  resolver: 'Auditorias, Não Conformidades, CAPA e Mudanças: um ponto de partida para acompanhar achados e tratativas.',
  cuidar: 'Calibração, Manutenção e Monitoramento: um ponto de partida para organizar equipamentos e medições.',
  evoluir: 'Riscos, Indicadores, Fornecedores e Clientes: um ponto de partida para acompanhar resultados e relacionamentos.'
};
selector.hidden = false;
selector.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const group = button.dataset.group;
    selector.querySelectorAll('button').forEach(option => {
      option.setAttribute('aria-pressed', String(option === button));
    });
    document.querySelectorAll('.module-group').forEach(section => {
      section.hidden = group !== 'todos' && section.id !== group;
      section.classList.toggle('recommended', section.id === group);
      section.getAnimations().forEach(animation => animation.cancel());
      if (!section.hidden) reveal(section);
    });
    selector.querySelector('.selector-result').textContent = suggestions[group] || 'Os 14 módulos estão disponíveis abaixo.';
    const jump = selector.querySelector('.selector-jump');
    jump.hidden = group === 'todos';
    if (group !== 'todos') jump.href = `#${group}`;
  });
});

selector.querySelector('[data-group="documentar"]').click();

const exampleSelector = document.querySelector('.example-selector');
const exampleButtons = exampleSelector.querySelectorAll('button');
function selectExample(id, animate = true) {
  exampleButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.example === id)));
  document.querySelectorAll('.product-example').forEach(example => {
    example.hidden = example.id !== id;
    example.getAnimations().forEach(animation => animation.cancel());
    if (!example.hidden && animate) reveal(example);
  });
  const selected = [...exampleButtons].find(button => button.dataset.example === id);
  exampleSelector.querySelector('.example-status').textContent = `Mostrando: ${selected.textContent}.`;
}
exampleButtons.forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') !== 'true') selectExample(button.dataset.example);
}));
function followExampleHash() {
  const id = location.hash.slice(1);
  if (![...exampleButtons].some(button => button.dataset.example === id)) return;
  selectExample(id, false);
  document.getElementById(id).scrollIntoView();
}
exampleSelector.hidden = false;
selectExample('exemplo-documentos', false);
window.addEventListener('hashchange', followExampleHash);
followExampleHash();

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
