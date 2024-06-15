# Login with JWT

A full-stack application that provides user authentication and authorization functionalities, allowing users to register and securely log in, built using Node.js + Express for backend and React (JavaScript, HTML, and CSS) + TypeScript for frontend.

## Live Link

[luisbett-login-jwt.netlify.app](https://luisbett-login-jwt.netlify.app/)

## Project Status

This project is completed.

## Project Screen Shots

![screenshot_1](/app/public/screenshot_1.png)

![screenshot_2](/app/public/screenshot_2.png)

![screenshot_3](/app/public/screenshot_3.png)

![screenshot_4](/app/public/screenshot_4.png)

![screenshot_5](/app/public/screenshot_5.png)

![screenshot_6](/app/public/screenshot_6.png)

![screenshot_7](/app/public/screenshot_7.png)

![screenshot_8](/app/public/screenshot_8.png)

![screenshot_9](/app/public/screenshot_9.png)

![screenshot_10](/app/public/screenshot_10.png)

## About

This was my second project built using Node.js + Express for backend and the third one built using React JS + TypeScript for frontend, and the objective was to study authentication and authorization using JWT token and also CRUD operations.

I wanted to build an application where I could log in and log out and also create, update and delete users in my application.

I used a Postgres database service called [Neon](https://neon.tech/) to store users data.

In this project, I used different packages:

**Backend:**

* [**bcrypt**](https://www.npmjs.com/package/bcrypt) for creating hashed passwords in the database;
* [**cookie-parser**](https://www.npmjs.com/package/cookie-parser) for parsing cookie data in incoming requests;
* [**cors**](https://www.npmjs.com/package/cors) for enabling Cross-Origin Resource Sharing;
* [**dotenv**](https://www.npmjs.com/package/dotenv) for loading environment variables;
* [**express**](https://www.npmjs.com/package/express) for using Express in my Node.js app;
* [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken) for implementing JSON Web Tokens;
* [**jwt-decode**](https://www.npmjs.com/package/jwt-decode) for decoding and extracting information from JWT tokens;
* [**postgres**](https://www.npmjs.com/package/postgres) for interacting with the Postgres database hosted on Neon;

**Frontend:**

* [**react-icons**](https://www.npmjs.com/package/react-icons) for the icons in the project;
* [**react-loading-icons**](https://www.npmjs.com/package/react-loading-icons) for the loading icons in the project;
* [**react-hot-toast**](https://www.npmjs.com/package/react-hot-toast) for the notifications in the project;
* [**react-jwt**](https://www.npmjs.com/package/react-jwt) for functionalities related to JWT tokens in the project;

I spent a considerable time learning about types of authentication and authorization and how it works. Also, I learned a lot about JWT tokens and where to store data related to them to avoid Cross Site Scripting (XSS) and Cross Site Request Forgery (CSRF) attacks.

I chose to use Vite to minimize the initial setup and invest more time in working on the project's business logic.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

**Backend**

Go to server folder:

`cd server`

Installation:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:3333`

**Frontend**

Go to app folder:

`cd app`

Installation:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:5173`