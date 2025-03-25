# Amazon Scraper

Este projeto permite realizar o scraping de produtos da Amazon com base em um termo de pesquisa. O backend utiliza Express, Axios e JSDOM para coletar os dados, enquanto o frontend foi desenvolvido com Vite, Vanilla JS e CSS.

## Tecnologias Utilizadas

- **Backend**: Express, Axios, JSDOM
- **Frontend**: Vanilla JS, Vite, CSS

## Como Rodar o Projeto

### 1. Instalar Dependências

#### Backend

No diretório `amazon-scraper`, instale as dependências do servidor, caso não possua o bun instalado será necessário instalá-lo de acordo com o sistema operacional como informa em: `https://bun.sh/`

```bash
cd amazon-scraper
bun install
```

### Frontent
No diretório `amazon-scraper-frontend`, instale as dependências do vite:

```bash
cd amazon-scraper-frontend
npm install
```


2. Rodar o Backend

No diretório backend, inicie o servidor Express:
```bash
bun run server.js
```
O servidor estará rodando em `http://localhost:3000`.

3. Rodar o Frontend

No diretório frontend, inicie o servidor Vite:

```bash
npm run dev
```

4. Usar a Aplicação

    Abra o frontend em `http://localhost:5173`.

    Digite um termo de pesquisa (por exemplo, "laptop") e clique no botão "Buscar".

    O backend irá coletar os produtos da Amazon e exibir as informações no frontend.

Como Funciona

    O usuário digita um termo de pesquisa no frontend.

    O frontend envia uma requisição para o backend.

    O backend realiza o scraping da Amazon e retorna os dados dos produtos.

    O frontend exibe os resultados na página.

Considerações Finais

    O backend lida com possíveis erros na requisição e na coleta de dados.

    O frontend exibe mensagens de erro se algo der errado durante a busca.