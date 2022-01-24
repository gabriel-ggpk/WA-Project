&#xa0;

</div>

<h1 align="center">Wa Project</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/gabriel-ggpk/wa-project?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/gabriel-ggpk/wa-project?color=56BEB8">

</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="https://github.com/gabriel-ggpk" target="_blank">Author</a>
</p>

<br>

## :dart: About

This project is an RESTful API to manage a system of laboratories and exams based on a MongoDB database

## :sparkles: Features

- basic CRUD funcionalities for the exam and laboratory documents
- association funcionality to link a exam to various laboratories
- create, update and delete many documenst at once

## :rocket: Technologies

The following tools were used in this project:

- [Mongoose](https://mongoosejs.com)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## Architecture and Behavior

The project arquitecture revolves around 3 mais modules

- Routes: where all of our logic for calling the api routes and the responses they will return
- Controllers: Each controller carries the main logic of the requisitions inside a router, they will make the bridge between the user requests and the database
- Models: Each file defines a model for our mongoose documents, they will define the format and validations for the exams and labs

Ex.

1. user calls a route to get all the active exams (BASE_URL/api/exam/active)
2. the exam router will run the function corresponding to the route
3. the function will call the controller to run its main logic
4. modifications on the database are bridged by the exam model
5. the controller returns it's result to the router
6. the router then returns the application response to the user

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/gabriel-ggpk/wa-project

# Access
$ cd wa-project

# Install dependencies
$ npm i

# to run the project locally
$ npm run start:dev

# The server will initialize in the <http://localhost:3000>

# to build the project to js
$ npm run build

```

<a href="#top">Back to top</a>
