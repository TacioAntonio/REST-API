# Back-End :: Node.js
> Criar conta - Entrar - Recuperar conta

![alt text](https://cdn.filestackcontent.com/aq3jZRygQy6ku6ElUlJw)
``` 
REST API + Node.js + Express + Nodemon + MongoDB + Mongoose + Robo 3T + BCrypt.js + Body-parser + Insomnia + MVC + JWT + Mailtrap + Nodemailer + Handlebars.js + Fs + Path
```

## API
API (Application Programming Interface) ou em português Interface de Programação de Aplicações, trata-se de um conjunto de rotinas pré-estabelecidas que facilita o desenvolvimento de um programa de computador, fornecendo todos os elementos básicos, que são reunidos pelo programador.

## API WEB
Refere-se a um conjunto definido de mensagens de requisição e resposta HTTP - Hypertext Transfer Protocol, essas mensagens geralmente são expressas em XML ou JSON.

## REST API
Atualmente na Web 2.0 está sendo abandonado o modelo SOAP e sendo aderido o modelo REST (Representational State Transfer) que é um modelo de arquitetura que consiste em um conjunto de restrições e propriedades baseadas no modelo HTTP. Um Web Service que obedeça ao modelo arquitetural REST fornece interoperabilidade entre sistemas de computadores na Internet.

## Web 2.0
"Web 2.0 é a mudança para uma internet como plataforma, e um entendimento das regras para obter sucesso nesta nova plataforma. Entre outras, a regra mais importante é desenvolver aplicativos que aproveitem os efeitos de rede para se tornarem melhores quanto mais são usados pelas pessoas, aproveitando a inteligência coletiva" - [Tim O'Reilly](https://pt.wikipedia.org/wiki/Tim_O%27Reilly)

## MVC
MVC (Model-View-Controller) possibilita a divisão do projeto em camadas, com isso possibilitando isolar as regras de negócios da lógica de apresentação, a interface com o usuário.

* **Model**      - É a camada para a manipulação de dados.
* **View**       - Ela faz a exibição dos dados ao usuário.
* **Controller** - Responsável por receber todas as requisições do usuário.

Quando um navegador realiza uma requisição para um servidor, a primeira camada que terá contato é o Controller, diante disso o controller irá observar que tipo de pedido foi realizado e assim poderá ou não conversar com a camada de Model, pois talvez não seja necessário conversar com o Banco de Dados, e então uma View é direcionada de volta ao navegador com todos os dados formatados.

## Node.js
Node.js é um interpretador de código JavaScript que possui o intuito de migrar o JavaScript do lado do client para o lado do servidor. Node.js usa um modelo de I/O direcionada a evento não bloqueante com isso ele ganha a caracteristica de ser leve e eficiente, graças ao Event Loop é possível programar em uma única thread com assincronismo. Ele foi desenvolvido sobre o motor JavaScript V8 do Google Chrome e apresentado por Ryan Dahl em 2009 na JSConf.

> Baixe ele no site oficial do [Node.js](https://nodejs.org/en/download/).

## Express
Express é um framework que foi projetado para construir aplicativos da Web e APIs. Ele é usado para desenvolver de forma mais descomplicada um servidor HTTP.

> $ npm install express

## Nodemon
O nodemon é uma ferramenta que ajuda a desenvolver aplicativos baseados em node.js reiniciando automaticamente o aplicativo do nó quando as alterações de arquivo no diretório são detectadas.

> $ npm install --save-dev nodemon

## MongoDB
MongoDB é classificado como NoSQL - que refere-se a todo e qualquer banco de dados não relacional, no caso do MongoDB ele é orietado a documentos. É perfeito para armazenar, recuperar e gerenciar informações orientadas a documentos.

> Baixe ele no site oficial do [MongoDB](https://docs.mongodb.com/manual/installation/).
Executando o [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-from-cmd).

## Mongoose
O Mongoose é uma ferramenta de modelagem de objetos do MongoDB, ele foi projetado para funcionar em ambientes assincronos proporcionando uma solução baseada em esquemas para modelar os dados da sua aplicação.

> $ npm install mongoose

## Robo 3T
É a GUI (Graphical User Interface) do MongoDB com shell embutido.

> Baixe ele no site oficial do [Robot 3T](https://robomongo.org/download)

## BCrypt.js
É uma biblioteca de hash, que irá encriptar a senha.

> $ npm install bcryptjs

## Body-parser
O body-parser é um módulo capaz de converter o body da requisição para vários formatos. Um desses formatos é JSON. Node.js em si não sabe converter os dados da requisição em JSON.

> $ npm install body-parser

## JWT - JSON WEB TOKEN
É para o usuário se autenticar com a API: O usuário irá receber um token de autentificação que é um token criptografado que o back-end irá validar a cada requisição que o usuário enviar.

> $ npm install jsonwebtoken

Gere um Hash MD5 e armazene em *auth.json*:
```json
{
   "secret": "827ccb0eea8a706c4c34a16891f84e7b"
}
``` 

## Insomnia
Insomnia é um cliente REST multiplataforma é usado para testar requisições em API.

```json
>> Crie um WORKSPACE
##########################################################################
>> Crie uma REQUEST chamada 'Register' que será um POST
>> Ela que chamará a http://localhost:3000/auth/register

>> Crie uma variável de ambiente
{
  "base_url": "http://localhost:3000"
}

>> Ficando base_url/auth/register
##########################################################################
>> Crie uma REQUEST chamada 'Authenticate' que será um POST

>> Ficando base_url/auth/authenticate
##########################################################################
>> Crie uma REQUEST chamada 'Projects' que será um GET

>> Ficando base_url/projects
>> TESTANDO O TOKEN
>>> Coloque um HEADER: Authorization, Value: {qualquerValor}
##########################################################################
>> Crie uma REQUEST chamada 'Forgot Password' que será um POST

>> Ficando base_url/auth/forgot_password
>> TESTANDO O FORGOT PASSWORD
{
	"email": "usuario@email.com"
}
##########################################################################
>> Crie uma REQUEST chamada 'Reset Password' que será um POST

>> Ficando base_url/projects

{
 	  "email": "usuario@email.com",
    "token": "tokenFornecidoPeloBackEnd",
    "password": "newPassword"
}

>> Ficando base_url/auth/reset_password
``` 

> Baixe ele no site oficial do [Insomnia](https://insomnia.rest/download/).

## Mailtrap
Mailtrap é um falso servidor SMTP, é usado em nivel de desenvolvimento, não em produção. Crie uma conta no site oficial.

## Nodemailer
É um módulo para aplicativos Node.js para facilitar o envio de e-mail.

> $ npm install nodemailer

## Fs - File System
É usado para interagir com o sistema de arquivos.

Uso comum para o módulo File System:
* Ler arquivos
* Crie arquivos
* Atualizar arquivos
* Deletar arquivos
* Renomear arquivos

> $  npm install fs

## Path
É usado para trabalhar com caminhos de arquivos e diretórios.

> $  npm install path

## Handlebars.js
É um sistema de template engine.

> $ npm install nodemailer-express-handlebars

## Instalando
> $ git clone https://github.com/TacioAntonio/REST-API.git 
$ cd REST-API
$ npm install
$ npm start