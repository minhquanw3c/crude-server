## Basic API application for CRUD operations.

### Technologies used

> ExpressJS, Prisma, JWT

### Available endpoints

> GET /users - To get all of registered users
> 
> POST /users - To create a new user
>
> PUT /users/:id - To update user information
>
> DELETE /users/:id - To delete user from database
>
> GET /tokens - To fetch list of tokens
>
> GET /chains - To fetch list of chains

### Requirements
> OS: Windows
> 
> Node version: v22.x.x
>
> Npm version: v10.x.x

### How to set up and run the project

Clone the repo to your device and run command to install dependencies
> npm install

then, run

> npx prisma generate

afterward

> npx prisma db push

a new **dev.db** will appear in folder **prisma**, this file is your local database to store data of CRUD operations.

next, to populate initial data, run

> npm run prisma:seed

finally, to start the application, run

> npm run dev

bonus point, to view and browse created database on chrome, run

> npx prisma studio

a new chrome tab will appear to show the database which you can interact with