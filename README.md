<div align="center">
  <h1>LockerFace API</h1>
<p>A API LockerFace foi feita para suportar o aplicativo, cujo projeto se encontra <a href="https://github.com/anaclara-gf/lockerface-app"><b>neste</b></a></p> respositório.
  <p>Foi usado <a href="https://nestjs.com/"><b>NestJS</b></a>, framework Node.js, para escrever esse projeto. Também utilizou-se <a href="https://www.mongodb.com/pt-br"><b>mongoDB</b></a> como banco de dados</p>.
</div>
<p align="center">
 <a href="#pré-requisitos">Pré-requisitos</a> •
 <a href="#instalação">Instalação</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#créditos">Créditos</a>
</p>

## Pré-requisitos 

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/). 

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/). Também recomendo você baixar o [MongoDB Compass](https://www.mongodb.com/try/download/compass) para visualizar o banco de dados e o [Postman](https://www.postman.com/) (ou qualquer semelhante) para testar os endpoints da API.

## Instalação

1. Clonar o repositório na sua máquina

2. Instalar as dependências com `npm install`

3. Criar um cluster gratuito no [mongoDB Atlas](https://www.mongodb.com/pt-br)

4. Criar um arquivo .env na raíz do projeto no qual você irá colocar a URI de conexão com o banco de dados.
```JavaScript
MONGODB_URI=sua-uri-aqui
```

5. Iniciar o projeto com `npm run start:dev`

Pronto! A API já estará disponível para testes no localhost:3000

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [NestJS](https://nestjs.com)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Mongoose](https://mongoosejs.com/)

## Créditos

Esse projeto é de autoria de [Ana Clara Garcia Farah](https://github.com/anaclara-gf)
