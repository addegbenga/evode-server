const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//DB Config
const CONNECTDB = require("./config/db");

//Connect to MongoDB ATLAS
CONNECTDB();

//view engine
app.set("view engine", "pug");

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//public add
app.use(express.static("public"));

//setup cors
app.use(cors("*"))

const port = process.env.PORT || 5000; //port setting
app.listen(port, () => console.log("App listening on port " + port));
