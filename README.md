# PrioriTea

A full-stack to-dos, CRUD web app

Project's highlights:
  * Stack used: Node & Express, PostgresSQL, and React.
  * Pagination, filtering, search, and sorting, to-dos can be created, displayed, edited and deleted.
  * An auth system using argon2 for hashing and comparing passwords, and JWT using httpOnly cookies with security oriented settings for verifying the user. A user only has access to his own tasks for all operations, meaning the user has to be signed in with a non-expired session.
  * Written in Typescript, shared types and logic are shared using monorepo packages linked by Lerna.
  * The server follows the MVC architecture, using OOP for for the models, controllers, and repositories. 
  * Deployed to AWS using Docker (docker-compose), with an image for the database, server, and Nginx to serve React's build and reverse proxy the client's api calls to the server.
