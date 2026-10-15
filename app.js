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
    const group = button.dataset.group;
    selector.querySelectorAll('button').forEach(option => {
      option.setAttribute('aria-pressed', String(option === button));
    });
    document.querySelectorAll('.module-group').forEach(section => {
      section.hidden = group !== 'todos' && section.id !== group;
      section.classList.toggle('recommended', section.id === group);
    });
    selector.querySelector('.selector-result').textContent = suggestions[group] || 'Os 14 módulos estão disponíveis abaixo.';
    document.querySelector('.category-links').hidden = group !== 'todos';
    const jump = selector.querySelector('.selector-jump');
    jump.hidden = group === 'todos';
    if (group !== 'todos') jump.href = `#${group}`;
  });
});

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
