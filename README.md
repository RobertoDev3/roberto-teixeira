# Portfólio pessoal - Roberto Teixeira

Projeto desenvolvido para a atividade prática de **Fundamentos da Programação Web**.

O site apresenta um portfólio pessoal em HTML, CSS e JavaScript puro, com navegação por seções, tema claro/escuro, formulário validado e integração com a API pública do GitHub para exibir projetos.

## Funcionalidades

- Página inicial com apresentação pessoal.
- Seção **Sobre mim** com informações e interesses.
- Seção **Formação** com conhecimentos e tecnologias estudadas.
- Seção **Portfólio** com 3 projetos carregados automaticamente do GitHub.
- Página **Todos os projetos** com a lista completa de repositórios públicos.
- Formulário de contato com validação em JavaScript.
- Simulação de envio com mensagem de sucesso temporária.
- Menu responsivo para telas menores.
- Alternância entre tema claro e tema escuro.
- Botão de tema com ícone alternando entre lua e sol.
- Efeitos de hover nos botões e links principais.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- API pública do GitHub

Não foram utilizados frameworks de CSS ou JavaScript.

## Estrutura de arquivos

- `index.html`: página principal do portfólio.
- `projetos.html`: página com todos os projetos públicos do GitHub.
- `css/styles.css`: estilos, responsividade, temas e estados visuais.
- `js/script.js`: menu responsivo, alternância de tema e validação do formulário.
- `js/github-projects.js`: integração com a API do GitHub e renderização dos projetos.
- `README.md`: documentação do projeto.

## Como visualizar o projeto

Visualize pelo link:

[https://robertodev3.github.io/roberto-teixeira/](https://robertodev3.github.io/roberto-teixeira/)

Ou abra localmente:

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Clique duas vezes no arquivo `index.html`.
4. O projeto será aberto no navegador padrão.

## Como testar

- Use o menu superior para navegar pelas seções.
- Clique no botão de lua/sol para alternar entre tema claro e escuro.
- Na seção Portfólio, confira os 3 projetos carregados do GitHub.
- Clique em `Ver todos` para abrir a página completa de projetos.
- No formulário de contato, tente enviar com campos vazios para ver a validação.
- Preencha nome, e-mail válido e mensagem para testar a simulação de envio.

## Configuração dos projetos do GitHub

O usuário do GitHub usado na integração está definido em `js/github-projects.js`:

```js
const GITHUB_USERNAME = "RobertoDev3";
```

Por padrão, a página inicial exibe os 3 repositórios públicos atualizados mais recentemente.

Para escolher manualmente os 3 projetos principais, edite a constante:

```js
const FEATURED_PROJECTS = [];
```

Exemplo:

```js
const FEATURED_PROJECTS = ["stream-vibe", "e-commerce-desafio", "portifolio-2025"];
```

## Observação

Como a integração usa a API pública do GitHub sem token, pode haver limite temporário de requisições em alguns casos. Se isso acontecer, a página exibe uma mensagem de erro simples e pode ser testada novamente depois.
