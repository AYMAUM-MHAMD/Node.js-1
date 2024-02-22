const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const userController = require("../controllers/userController");


router.get("/add.html", userController.user_add_get);

router.post("/add.html", userController.user_post);


module.exports = router;
