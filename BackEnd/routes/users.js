const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Get Requests
  //Login
router.get('/login',
  (req, res) => res.render('login')
);
  //Register
router.get('/register',
  (req, res) => res.render('register')
);

//Post Requests
router.post('/register',
  (req, res) =>{
    const{name,email,password, password2} = req.body;
    let errors = [];

    //Check fields are all filled
    if(!name || !email || !password || !password2){
      errors.push({msg: 'Please fill all the fields'});
    }

    //Check both passwords match
    if(password !== password2){
      errors.push({msg: 'Passwords do not match'});
    }

    //Check password length
    if(password.length < 8){
      errors.push({msg: "Password has to be at least 8 characters long"});
    }

    if(errors.length > 0){
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    }else{
      //Validation has been succesful
      User.findOne({email: email})
        .then(user => {
          if(user) {
            //User exist
            errors.push({msg: 'Email is already registered'})
            res.render('register', {
              errors,
              name,
              email,
              password,
              password2
            });
          }else{
            const newUser = new User({
              name,
              email,
              password
            });

            //Hash password
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, (err, hash) =>
                {
                  if(err) throw err;
                  //Here we encrypt the password
                  newUser.password = hash;

                  //Save the user in the database
                  newUser.save()
                    .then(user => {
                      req.flash('success_msg', 'You are now registered and can log in');
                      res.redirect('login');
                    })
                    .catch(err => console.log(err));
                })
              );
          }
        })
      ;
    }

  }
);

//Login with Passport

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


//Logout

router.get('/logout', (req, res) =>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
module.exports = router;
