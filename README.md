# Qualidade em foco — proposta para Lacius

Estudo independente de redesign de https://www.lacius.com.br. **Não é o site oficial, não possui vínculo com a Lacius e não reproduz sua interface real.**

## O que melhora
- Mensagem inicial focada em benefício, não em quantidade de módulos.
- Soluções agrupadas por necessidade.
- Demonstração interativa sem cadastro: documentos, auditorias e ações.
- Passeio guiado no lugar de vídeo, fácil de alterar.
- Navegação responsiva, teclado e suporte a movimento reduzido.

## Abrir
Abra `index.html` no navegador. Não precisa instalar dependências.

Opcionalmente, sirva a pasta com Python:

```sh
python -m http.server 8787 --bind 127.0.0.1
```

Depois acesse `http://127.0.0.1:8787`.

## Estrutura
- `index.html`: textos e seções.
- `styles.css`: visual e adaptação para celular.
- `app.js`: telas demonstrativas, passeio e menu.

## Limites
Todos os dados da demonstração são fictícios. Interações ficam na memória e são apagadas ao recarregar. Não há login, coleta de dados, cookies, backend ou integração com o produto. Não são feitas promessas sobre preços, certificação ou funcionalidades reais. Os 14 módulos e as condições de demonstração foram consultados no site original; devem ser confirmados com a Lacius.

## Conferência manual
1. Alternar entre Documentos, Auditorias e Ações.
2. Simular aprovação e verificar que o estado mudou.
3. Abrir ação relacionada à auditoria e simular verificação.
4. Completar o passeio de três etapas e reiniciar o exemplo.
5. Testar menu, Escape, links e FAQ por teclado.
6. Conferir larguras de 390px e 1440px, sem rolagem horizontal.
