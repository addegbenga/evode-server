const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressSession = require('express-session');
const passport = require('passport');

const app = express();

// Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to MongoDB ATLAS
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected ...'))
.catch(err =>console.log(err));

//EJS
app.use(expressLayout);
app.set('view engine', 'ejs');

//bodyParser
app.use(express.urlencoded({extended:false}));

//public add
app.use(express.static("public"));

//Express session
app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global variables for different messages (maybe add this in a separate file)
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.delete_msg = req.flash('delete_msg');
  next();
  }
);

/* ROUTES */

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const port = process.env.PORT || 3000; //port setting
app.listen(port, () => console.log('App listening on port ' + port));
