const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//DB Config
const CONNECTDB = require("./config/db");

//Connect to MongoDB ATLAS
CONNECTDB();

//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use("/public", express.static(path.join(__dirname, "public")));
//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//setup cors
app.use(cors("*"));

//logger
app.use(morgan("tiny"));


//setup api
app.use("/api/auth", require("./routes/auth"));



const port = process.env.PORT || 5000; //port setting

app.listen(port, () =>
  console.log(`Server hosted on: http://localhost:${port}`)
);
