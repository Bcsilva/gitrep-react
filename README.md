# Basic Git Repo fetcher

## O que é?

Single page aplication que exibe resultados primários de repositórios do Github, próprios ou relativos, de acordo com o nome do usuário. Os resultados podem ser filtrados de duas formas:
- Se você clica no checkbox "Apenas repositórios privados?" os resultados mostrarão os repositórios privados criados pelo usuário.
- Caso contrário, os resultados mostrados serão os repositórios alheios marcados como estrela pelo usuário, os relativos

## Como instalar e utilizar?

Primeiramente, faça um git clone de https://github.com/Bcsilva/gitrep-react

> git clone https://github.com/Bcsilva/gitrep-react.git

Depois, instale as dependências:

> npm install

Vá ao diretório

> cd gitrep-react

E execute o projeto

> npm start

Se tudo der certo, ele rodará no seguinte link http://localhost:3000/

## Como funciona?

A aplicação utiliza os conceitos básicos de React, focados em componentes, estados e dependências externas: Bootstrap e Axios.

Foi criado um componente separado para performar as ações da aplicação, em ./components/formSearch.js que por si é chamado dentro de ./App.js

Dentro de formSearch.js, foram criados os seguintes estados para funcionamento da aplicação:
- searchTerm: termo de busca
- starred: flag para definir se a busca é baseada em um repositório favorito do usuário, ou repositório privado criado por ele
- userData: array de resultados de busca
- errorMsg: texto de mensagem de erro por falha da busca

Temos também as dependências externas do projeto:
- Axios: recurso para chamadas de API de um modo mais intuitivo e leve;
- Bootstrap: usado não apenas nessa aplicação, é um dos frameworks estéticos de Front-end ainda mais utilizados na atualidade

Primeiramente, foram criadas funções "handle" para as partes interativas do formulário de busca. A função delas foi fazer uma ligação direta com os campos de search e checkbox, e também atribuir uma ação ao botão de busca. 
O botão por sua vez chama uma função do Axios para fazer uma requisição na API do Github, usando o estado do campo do nome de usuário, com a intenção de retornar resulados. Caso contrário, ele retornará uma mensagem de erro usando o estado errorMsg. De qualquer forma, a cada nova busca, ele limpa os estados de userData e errorMsg para abrir espaço para novas ações.

E por último temos o render com todo o HTML formatado com o Bootstrap, localização dos estados e resultados de busca. 
