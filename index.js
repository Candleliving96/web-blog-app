import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var arrayOfPosts = [["Example Post 1", "Author1", "Test text 1", "Date1"], 
    ["Example Post 2", "Author2", "Test text 2", "Date2"], 
    ["Example Post 3", "Author3", "Test text 3", "Date3"],
    ["Example Post 4", "Author4", "Test text 4", "Date4"],
    ["Example Post 5", "Author5", "Test text 5", "Date5"],
    ["Example Post 6", "Author6", "Test text 6", "Date6"],
]

app.get("/", (req, res) => {
    res.render("index.ejs", { arrayOfPosts });
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.post("/post", (req, res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;
    console.log(currentDate);

    //FIX INFIITE ADDING WITH REFRESH
    arrayOfPosts.push([req.body["postTitle"], req.body["postAuthor"], req.body["postBody"], currentDate]);
    console.log(arrayOfPosts);
    res.render("index.ejs", { arrayOfPosts });
})

app.post("/view", (req, res) => {
    //console.log(arrayOfPosts[0]);
    console.log(req.body["buttonIndex"]);
    res.render("view.ejs", {
        post: arrayOfPosts[req.body["buttonIndex"]]
    });
});

app.post("/delete", (req, res) => {
    arrayOfPosts.splice(req.body["buttonIndex"], 1)
    res.render("index.ejs", { arrayOfPosts});
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})