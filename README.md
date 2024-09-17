# web-blog-app
Responsive and stylized web application that allows users to add, edit, and delete blog posts. Built using EJS, CSS, Node.js, Express.js, and PostgreSQL.

Make sure to create and fill out .env file accordingly:

PG_USER=your_username
PG_HOST=your_host_here
PG_DATABASE=your_database_name_here
PG_PASSWORD=your_database_password_here
PG_PORT="5432"

PostgreSQL must be downloaded. To set up table, navigate to database in pgAdmin and enter into Query Tool:

CREATE TABLE posts (
  id SERIAL,
  title VARCHAR(100),
  author VARCHAR(50),
  date_created VARCHAR(10),
  post_body text
); 

To run:
npm install
nodemon index.js

Program will run on localhost:3000.
