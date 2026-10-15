# Lacius — proposta de redesign

Estudo independente de redesign de https://www.lacius.com.br. **Não é o site oficial, não possui vínculo com a Lacius e não reproduz sua interface real.**

## O que melhora
- Mensagem inicial focada em benefício.
- Catálogo dos 14 módulos com explicações visíveis, agrupados em quatro necessidades.
- Três fluxos explicativos: documentos e treinamentos; auditorias e ações; equipamentos e alertas.
- Cada exemplo mostra problema, apoio do produto, etapas e módulos envolvidos.
- Navegação responsiva, teclado e suporte a movimento reduzido.

## Abrir
Abra `index.html` no navegador. Não precisa instalar dependências.

Opcionalmente:

```sh
python -m http.server 8787 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8787`.

## Estrutura
- `index.html`: textos, exemplos e seções.
- `styles.css`: visual e adaptação para celular.
- `app.js`: menu responsivo e fechamento por Escape.

## Limites
Os fluxos são ilustrações baseadas nas funcionalidades descritas no site original, não telas reais nem automações garantidas. As situações são fictícias. Não há cadastro, coleta de dados, cookies, backend ou integração com o produto. Preços, condições e escopo devem ser confirmados com a Lacius.

## Conferência manual
1. Abrir os exemplos pelos atalhos em Soluções e Conhecer o produto.
2. Conferir os três fluxos, quatro etapas por fluxo e módulos envolvidos.
3. Testar menu, Escape, links e FAQ por teclado.
4. Conferir 390px e 1440px, sem rolagem horizontal.
