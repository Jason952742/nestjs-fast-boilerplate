# NestJs Fast Boilerplate

> ### NestJS (Fastify) + MikroORM REST/GRPC API boilerplate for a typical project.

----------

# Getting started

## Installation
    
Install dependencies
    
    yarn

Copy config file and set JsonWebToken secret key

    cp /.env.example /.env
    
----------

## Database

The example codebase uses [MikroORM](https://mikro-orm.io/) with a MySQL database.

    
Now you can start the application with `yarn start`. It will automatically
create the database and run initial migration that sets up the database 
schema.

----------

## NPM scripts

- `yarn start` - Start application
- `yarn start:dev` - Start application in watch mode
- `yarn test` - run Jest test runner 
- `yarn start:prod` - Build application in prod mode

----------

## Start application

- `yarn start`
- Test api by browsing to `http://localhost:3000/api/articles`
- View automatically generated swagger api docs by browsing to `http://localhost:3000/docs`
- Run e2e tests with `yarn test:e2e`

----------

# Authentication
 
This application uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token.
