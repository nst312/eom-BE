[![Build Status](http://164.68.112.32:8080/buildStatus/icon?job=EOM%2FEOM-API)](http://164.68.112.32:8080/job/EOM/job/EOM-API/)

## EOM API

## Migration command

```bash
$ npx prisma migrate dev --name init
```

## Seeder command

```bash
$ npx prisma db seed
```

## Api Endpoints

```bash
'prefix': http://localhost:3001/api

'Auth': 
      /auth/register
      /auth/login
      /auth/refresh

'User': 
      /users              -- get all users [admin, pagination]
      /users/:id          -- get id by user
      /users/profile      -- get user profile
      /users/profile      -- update user profile
      /users/:id          -- delete user [admin]
      /users/change-password -- update password
      

'Post':
      /posts                 -- create post
      /posts                 -- gets all posts [search, pagination]
      /posts/:id             -- get id by post
      /posts/me              -- get my posts [pagination]
      /posts/:id/accept      -- accept post
      /posts/:id/accept      -- posts acceps [users]
      /posts/:id/rating      -- post resolver rating
      
    'Companies & Departments': [this apis permission only super admin and company admin]
      /companies           -- create Company
      /companies           -- get All Companies [pagination]
      /companies/:id       -- get By Id Company
      /companies/:id       -- update Company
      /companies/:id       -- delete Company
      
      /companies/:id/departments           -- create company based departments
      /companies/:id/departments           -- get All company based departments [pagination]
      /companies/:id/departments/:id       -- get By Id company based departments
      /companies/:id/departments/:id       -- update company based departments
      /companies/:id/departments/:id       -- delete company based departments
```

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup
```
1. First Take Pull From github.
2. Create .env file.
3. Must have to add cunnection string in .env file. ( copy from .env.example file )
4. after Run Docker command.
```

## Docker command

```dockerfile
docker-compose --env-file .env up -d 
```

## Check docker config

```dockerfile
docker-compose --env-file .env config
```

## PGAdmin

http://localhost:8092

## Adminer

http://localhost:8091

## Dev change

when create build change below line in .env file

FRONT_END=http://eom.ghanshyamdigital.com/


## Prettier source

https://github.com/marketplace/actions/prettier-action

## Jenkins Config

```shell
cd $GIT_CHECKOUT_DIR
docker-compose --env-file .env up -d --build
npm run build
npx prisma migrate dev
pm2 restart eom_api
```

## pm2 command

```
pm2 start ecosystem.config.js --env production
```

## Dev API

https://eomapi.ghanshyamdigital.com/api/

## How to run salary scheduler
1. going to app.service.ts file
2. testing: comment out time out function 
3. re-run the app


## License

Nest is [MIT licensed](LICENSE)..
