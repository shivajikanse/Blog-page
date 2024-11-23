import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// In-memory storage for blog posts
let posts = [];


app.get("/", (req, res) => {
  res.render("home.ejs", { posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs")
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const id = Date.now().toString();
  posts.push({ id, title, content });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit.ejs", { post });
});

app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const index = posts.findIndex(p => p.id === req.params.id);
  posts[index] = { ...posts[index], title, content };
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
