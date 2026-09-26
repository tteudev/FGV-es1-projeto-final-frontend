# Instalação e execução do frontend (esmforum-react)

O passo a passo completo, com os problemas encontrados no ambiente (Windows 11 e Node 24), está em [INSTALACAO.md do backend](https://github.com/tteudev/esmforum/blob/main/INSTALACAO.md). Aqui está o resumo do que se refere ao frontend.

## Pré-requisitos

- Node.js 22 ou superior e npm.
- O backend ([tteudev/esmforum](https://github.com/tteudev/esmforum)) em execução em `http://localhost:5000`, pois o frontend o consome.

## Passos

```console
git clone https://github.com/tteudev/esmforum-react.git
cd esmforum-react
npm install
npm start
```

O frontend abre em `http://localhost:3000`.

Para verificar apenas que o código compila:

```console
npm run build
```

## Observações

- O `npm install` mostra avisos de vulnerabilidades em dependências de desenvolvimento do `react-scripts`. Não usei `npm audit fix --force`, pois poderia quebrar a aplicação.
- Se a lista de perguntas ficar vazia, confira se o backend está rodando na porta 5000.
- Funcionalidade adicionada neste fork: campo de busca por palavra-chave em `src/pages/Pergunta.js` (ver `IMPLEMENTACAO_SOLID.md` no repositório do backend).
