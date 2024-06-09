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

![screenshot_3](/app/public/screenshot_4.png)

## About

This was my thirdy project built using React JS + TypeScript for frontend and the second built using Node.js + Express for backend, and the objective was to study authentication and authorization using JWT token.

I wanted to build an application where I could log in and log out and also make CRUD operations such as creating, updating and deleting users in my application.

...

In this project, I used different packages:

* [**react-icons**](https://www.npmjs.com/package/react-icons) for the icons in the project;
* [**react-loading-icons**](https://www.npmjs.com/package/react-loading-icons) for the loading icons in the project;
* [**react-hot-toast**](https://react-hot-toast.com/) for the notifications in the project;
* [**react-jwt**](https://www.npmjs.com/package/react-jwt) for functionalities related to JWT tokens in the project;

I spent a considerable time learning about types of authentication and authorization and how it works. Also, I learned a lot about JWT tokens and where to store data related to them to avoid XSS and CSFR attacks.

I chose to use Vite to minimize the initial setup and invest more time in working on the project's business logic.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

**Frontend**

Go to app folder:

`cd app`

Installation:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:5173`

**Backend**

Go to server folder

`cd server`

Installation:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:3333`