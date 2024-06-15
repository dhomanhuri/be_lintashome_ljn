require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const cronControllers = require("./controllers/cronControllers");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express(); const cron = require('node-cron');

// cron.schedule('* * * * * *', function () {
//     console.log('Running task every second');
//     cronControllers.sumCron()
// });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/apinya", usersRouter);

module.exports = app;
