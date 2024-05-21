# Digirift Technical Assessment

## Setup

1. Clone this repository and [this one](https://github.com/aj-abad/digirift-server)
2. Run the server with `composer install` and `php artisan serve`
3. Seed the database with `php artisan migrate:fresh --seed`
4. Run the client with `yarn install` and `yarn dev`
5. Sign into either of the two test accounts:
  tim@example.com
  tim123
  scott@example.com
  scott123
 

## Description and and approach

This is a basic todo management application built with a Laravel GraphQL backend and a Nuxt frontend. I chose to use a SQLite database for quick and portable testing and development. For the backend, I opted for Lighthouse as it integrates well with the Laravel ecosystem and provides a lot of features out of the box. I used Sanctum for authentication and Laravel rules for authorization, while I used custom validation rules for validating the uniqueness of a task's name for a certain user. For the frontend, I chose to use Apollo for its built-in composables that made it easier to sync the UI with the backend. Various ES6 features were used to make the code more readable and maintainable including but not limited to async/await, destructuring, arrow functions, and let/const keywords over var.

## Challenges and limitations


The application is fully functional for the most part. I however didn't have enough time to write unit tests for and Dockerize the Laravel app. In the Nuxt app, there's some jank in the UI and it gets stuck in spinner hell after each request. I think I could've used `useAsyncData` in conjunction with the Apollo composables for a smoother UI. Error handling is there, but there may be edge cases that could result in unclear error messages. I tried to make the code as clean and self-documenting as possible, but there's always room for improvement. I didn't get to add a lot of comments in the code, but I tried to make the function and variable names as descriptive as possible. As for improvements for the app, I would also add bulk update, searching, pagination, and custom dialogs instead of relying on `window.confirm` for deleting todos. A sign up feature would also be nice, as well as using an httpOnly cookie instead of localStorage for token storage.

Additionally, I took some creative liberties with the design of the app. All of the features present in the sample GIF were implemented, but I made each task individually deletable and added a logout button. I also added the name of the currently logged in user.
