const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");

router.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
});



router.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
});

router.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
});



router.post("/search", (req, res) => {
  console.log("****************");
  const SearchText = req.body.searchText.trim();

  User.find({ $or: [{ fireName: SearchText }, { lastName: SearchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((arr) => {
      console.log(arr);
    });
});

router.delete("/edit/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((arr) => {
      console.log(arr);
    });
});

router.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
