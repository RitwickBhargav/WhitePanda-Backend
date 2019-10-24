## Deployed on Heroku

> [https://whitepanda-backend.herokuapp.com/](https://whitepanda-backend.herokuapp.com/)

## API Endpoints

### User Controller

> **POST** `/api/users/register`

>  **POST** `/api/users/login`

>  **GET** `/api/users/profile`

### Cars Controller
> **GET** `/api/cars`

> **POST** `/api/cars/add`

> **POST** `/api/cars/update/:id`

> **GET** `/api/cars/delete/:id`

>  **GET** `/api/cars/available`

>  **POST** `/api/cars/book/:id`

>  **GET** `/api/cars/return/:id`

> **GET** `/api/cars/:id`

## Postman API docs

> [https://documenter.getpostman.com/view/7935280/SVtYRmJQ](https://documenter.getpostman.com/view/7935280/SVtYRmJQ)

## Installation and Run Scripts
1. `npm install`
2. `npm start`

## Authentication
I have used BcryptJS and JsonWebToken for authentication.

    npm i bcryptjs jsonwebtoken

# APIs for WhitePanda Backend Task for Car Rental System. Functions:

## Register/login users (JWT).
    1. Add/update/delete Cars.
    2. Search Cars on the basis of availability and filters.
    3. Book car if its available
    4. Return a car
    