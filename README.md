
# Teste técnico Irriga Global

Projeto desenvolvido com base no teste aplicado pela  <a href="https://irrigaglobal.com/br/" target="_blank">Irriga Global</a> 

### 📋 Pré-requisitos

Antes de rodar o servidor, precisa estar instalado:

* [NodeJs] (https://nodejs.dev/)
* [Mysql] (https://www.mysql.com/)
* [PM2] (https://pm2.keymetrics.io/)

### 🔧 Instalação

Antes de efetuar a instalação padrão, é necessário instalar os pacotes que estão descrito em 'Pré-Requisitos', após a instalação deve entrar na pasta raiz do projeto
e executar o comando,
````
 npm install
````
No qual irá efetuar a instalação dos pacotes que estão configurados no package.json

## ⚙️ Comandos

1) Para iniciar os testes é necessário executar o comando, os testes podem ser conferidos dentro do arquivo ./test/test.js
```
npm run test
```

2) Para efetuar manualmente a atualização da previsão do tempo, pode ser executado via shell o seguinte comando
```
npm run initilize_monitoring :param
```
o :param pode ser o ID ou o nome da cidade, caso queira, pode deixar em branco que irá executar para todas as cidades que estão na base de dados.

3) Para poder monitrar e executar em modo produção utilizar o comando 
```
npm run prod
```
irá executar o projeto utilizando o pm2
 * Para remover de produção 
 ```
 pm2 delete irrigaTeste
 ```
* Para verificar os logs do banco
```
pm2 logs irrigaTeste
```

## 🛠️ Construído com

Foram usadas as seguintes ferramentas para desenvolver este projeto.

* Axios (https://www.axios.com/) 
* Chai (https://www.chaijs.com/)
* Mocha (https://mochajs.org/) 
* Moment (https://momentjs.com/)
* Sequelize (https://sequelize.org/)


## ✒️ Autor

Desejvolvido por:

[Alex Schmidt](https://github.com/AleFrick)


Copyright (c) 2021 Alex Schmidt
