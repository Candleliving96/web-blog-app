import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
  })
  
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var arrayOfPosts=[];
var numPosts = arrayOfPosts.length;

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts ORDER By id ASC");
        arrayOfPosts = result.rows;
        //console.log(arrayOfPosts);
        res.render("index.ejs", { 
            posts: arrayOfPosts,
            numPosts: result.rows.length
        });
    } catch (err) {
        console.log("error getting posts: " + err);
    }
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.post("/post", async (req, res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let creationDate = `${month}-${day}-${year}`;
    console.log(creationDate);

    //FIX INFIITE ADDING WITH REFRESH
    try {
        const result = await db.query("INSERT into posts (title, author, date_created, post_body) VALUES ($1, $2, $3, $4)",
            [req.body["postTitle"], req.body["postAuthor"], creationDate, req.body["postBody"]]
        );
        res.redirect("/");
    } catch (err) {
        console.log("error inserting post: " + err)
    }

})

app.post("/view", async (req, res) => {
    try {
        const postId = req.body["PostId"];
        console.log(postId);
        const result = await db.query("SELECT * from posts WHERE id = $1", [postId]);
        console.log("result is " + result.rows[0]);
        res.render("view.ejs", {
            post: result.rows[0],
        });
    } catch (err) {
        console.log("error viewing post: " + err);
    }

});

app.post("/delete", async (req, res) => {
    try {
        const postId = req.body.PostId;
        console.log("post id is " + postId);
        const result = await db.query("DELETE FROM posts WHERE id = $1", [postId]);
        res.redirect("/")
    } catch (err) {
        console.log("error deleting post: " + err);
    }
})

app.post("/edit", async (req, res) => {
    try {
        const postId = req.body.PostId;
        console.log(req.body.PostId);
        const result = await db.query("SELECT * from posts WHERE id = $1", [postId]);
        res.render("edit.ejs", {
            post: result.rows[0]
        });
    } catch (err) {
        console.log("error seeing edit page: " + err);
    }
})

app.post("/submit-edit", async (req, res) => {
    try {
        const newTitle = req.body.editedTitle;
        const newAuthor = req.body.editedAuthor;
        const newBody = req.body.editedText;
        const postId = parseInt(req.body.PostId);
        const result = await db.query("UPDATE posts SET title = $1, author = $2, post_body = $3 WHERE id = $4",
            [newTitle, newAuthor, newBody, postId]
        );
        res.redirect("/");
    } catch (err) {
        console.log("error updating post: " + err);
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})