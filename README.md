# web-blog-app
Responsive and stylized web application that allows users to add, edit, and delete blog posts. Built using EJS, CSS, Node.js, Express.js, and PostgreSQL.

Make sure to create and fill out .env file accordingly:

PG_USER=your_username
<br />
PG_HOST=your_host_here
<br />
PG_DATABASE=your_database_name_here
<br />
PG_PASSWORD=your_database_password_here
<br />
PG_PORT="5432"

PostgreSQL must be downloaded. To set up table, navigate to database in pgAdmin and enter into Query Tool:

CREATE TABLE posts (
  <br />
  id SERIAL,
  <br />
  title VARCHAR(100),
  <br />
  author VARCHAR(50),
  <br />
  date_created VARCHAR(10),
  <br />
  post_body text
  <br />
); 

To run:
npm install
<br />
nodemon index.js

Program will run on localhost:3000.
