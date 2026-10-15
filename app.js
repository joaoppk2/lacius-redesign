const state = { view: 'documentos', document: 'Em revisão', action: false, tour: -1 };
const views = {
  documentos: { title: 'Documentos', intro: 'Consulte a versão e acompanhe a aprovação de um procedimento.' },
  auditorias: { title: 'Auditorias', intro: 'Um achado com contexto facilita o acompanhamento da ação.' },
  acoes: { title: 'Ações', intro: 'Acompanhe o responsável, registre a evidência e conclua a verificação.' }
};
const steps = [
  { view: 'documentos', title: '1 de 3 · A informação certa', text: 'Confira o procedimento e simule sua aprovação no botão abaixo.' },
  { view: 'auditorias', title: '2 de 3 · O contexto acompanha', text: 'Veja o achado da auditoria e abra sua ação relacionada.' },
  { view: 'acoes', title: '3 de 3 · Feche o ciclo', text: 'Simule a verificação da evidência para concluir a ação. Você pode reiniciar quando quiser.' }
];
const content = document.querySelector('#view-content');
const feedback = document.querySelector('#feedback');
function announce(text) { feedback.textContent = text; }
function render() {
  document.querySelector('#view-title').textContent = views[state.view].title;
  document.querySelectorAll('.demo-nav [data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
  let record;
  if (state.view === 'documentos') {
    record = `<article class="record"><div><h4>Procedimento de inspeção de recebimento</h4><p>DOC-001 · Revisão 03 · Responsável: Ana</p><p>Alteração: inclusão da conferência de identificação do lote.</p><span class="pill ${state.document === 'Em revisão' ? 'amber' : ''}">${state.document}</span></div><button class="button small" data-action="approve" ${state.document === 'Aprovado' ? 'disabled' : ''}>${state.document === 'Aprovado' ? 'Aprovação simulada ✓' : 'Simular aprovação'}</button></article>`;
  } else if (state.view === 'auditorias') {
    record = `<article class="record"><div><h4>Auditoria interna · Recebimento</h4><p>AUD-002 · Responsável: Bruno</p><p>Achado fictício: registros de inspeção sem identificação do lote.</p><span class="pill amber">Ação vinculada: AC-003</span></div><button class="button small" data-action="open-action">Ver ação relacionada →</button></article>`;
  } else {
    record = `<article class="record"><div><h4>Padronizar a identificação nos registros</h4><p>AC-003 · Origem: AUD-002 · Responsável: Clara</p><p>Evidência fictícia: três registros de exemplo preenchidos com o lote.</p><span class="pill ${state.action ? '' : 'amber'}">${state.action ? 'Verificação concluída' : 'Aguardando verificação'}</span></div><button class="button small" data-action="complete" ${state.action ? 'disabled' : ''}>${state.action ? 'Conclusão simulada ✓' : 'Simular verificação'}</button></article>`;
  }
  content.innerHTML = `<p class="view-intro">${views[state.view].intro}</p>${record}`;
}
function changeView(view, focus = false) {
  state.view = view;
  announce('');
  render();
  if (focus) {
    const title = document.querySelector('#view-title');
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }
}
document.querySelectorAll('.demo-nav [data-view], .module-demo').forEach(button => {
  button.addEventListener('click', () => {
    changeView(button.dataset.view);
    if (button.classList.contains('module-demo')) {
      document.querySelector('#demo').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      changeView(button.dataset.view, true);
    }
  });
});
content.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  if (button.dataset.action === 'open-action') { changeView('acoes', true); return; }
  if (button.dataset.action === 'approve') {
    state.document = 'Aprovado';
    render();
    announce('Aprovação simulada. Nenhum documento real foi alterado.');
  } else if (button.dataset.action === 'complete') {
    state.action = true;
    render();
    announce('Verificação concluída neste exemplo. Nenhuma ação real foi alterada.');
  }
  const replacement = content.querySelector('button');
  replacement.disabled = false;
  replacement.setAttribute('aria-disabled', 'true');
  replacement.focus({ preventScroll: true });
  replacement.addEventListener('click', event => event.stopImmediatePropagation(), { capture: true });
});
const tourButton = document.querySelector('#tour-next');
function resetTour() {
  state.tour = -1;
  document.querySelector('#tour-title').textContent = 'Um minuto para entender.';
  document.querySelector('#tour-text').textContent = 'Siga um passeio rápido por documentos, auditorias e ações.';
  tourButton.textContent = 'Iniciar passeio →';
}
tourButton.addEventListener('click', () => {
  state.tour += 1;
  if (state.tour >= steps.length) { resetTour(); announce('Passeio concluído. Explore as telas livremente.'); return; }
  const step = steps[state.tour];
  changeView(step.view);
  document.querySelector('#tour-title').textContent = step.title;
  document.querySelector('#tour-text').textContent = step.text;
  tourButton.textContent = state.tour === steps.length - 1 ? 'Concluir passeio ✓' : 'Próxima etapa →';
});
document.querySelector('#reset').addEventListener('click', () => {
  state.document = 'Em revisão'; state.action = false;
  resetTour(); changeView('documentos'); announce('Exemplo reiniciado. Todos os dados são fictícios.');
});
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuButton.focus(); }
});
render();
