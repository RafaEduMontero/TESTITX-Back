<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) Se realiza API de TEST de IX referido a planes de carrera. Se implementa MailTrap para el envío de mail.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Atención

Para el envío de mail se trabajó con MailTrap https://mailtrap.io/ 
se crea un archivo .env y se declara las siguientes variables

```bash
# unit tests
MAIL_HOST=TuHost
MAIL_PORT=TuPUERTO
MAIL_USER=TUUSER
MAIL_PASSWORD=TUPASSWORD

DEFAULT_EMAIL_FROM=example@example.com
APP_NAME=example
```
