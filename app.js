const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const MyData = require("./models/myDataSceme");
app.set("view engine", "ejs");
app.use(express.static("public"));

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get("/", (req, res) => {
  MyData.find()
    .then((result) => {
      res.render("home", { mytitle: "Homeee", arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index.html", (req, res) => {
  res.send("<h1>www</h1>");
});

mongoose
  .connect(
    "mongodb+srv://nikada1243:hXES9AuylRh3P66b@cluster0.qwn8pra.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  const myData = new MyData(req.body);
  myData
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
