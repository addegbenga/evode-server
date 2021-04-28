const passport = require("passport");
const crypto = require("crypto");

const User = require("../models/User");

const { sendEmail } = require("../middleware/email");
const { sendTokenResponse } = require("../middleware/utils");

const {
    loginValidations,
    registerValidations,
    changePasswordValidation,
    resetPasswordValidation,
} = require("../middleware/validation");


class AuthController {
    async getUser(req, res) {
        try {
          const user = await User.findById(req.user.id);
          if (!user) {
            return res.json({ error: "user not found" });
          }
          res.json(user);
        } catch (error) {
          console.log(error);
        }
    }

    async registerWithPassport(req, res, next) {
        console.log(req.body);
        passport.authenticate(
          "register",
          { session: false },
          function (err, user, info) {
            if (err) {
              return res.json({ error: err });
            }
            const { error } = registerValidations(req.body);
            if (error) {
              return res.json({ error: error.details[0].message });
            }
            if (info) {
              return res.json({ error: info.message });
            }
            if (user) {
              return res.json({ msg: "User Created Succesfully", data: user });
            }
          }
        )(req, res, next);
    }

    async loginWithPassport(req, res, next) {
        passport.authenticate(
          "login",
          // { session: false },
          function (err, user, info) {
            console.log(req.body);
            if (err) {
              return res.json({ error: err.message });
            }
            const { error } = loginValidations(req.body);
            if (error) {
              return res.json({ error: error.details[0].message });
            }
            if (info) {
              return res.json({
                error: info.message,
              });
            }
            req.logIn(user, function (err) {
              if (err) {
                return res.json({ error: err });
              }
              return sendTokenResponse(user, 200, res);
            });
          }
        )(req, res, next);
    }

    async updatePassword(req, res) {
        const id = req.user.id;
        try {
          const user = await User.findById(id);
          if (!user) {
            return res.json({ error: "user not authorized" });
          }
          const newDetails = {
            currentPassword: req.body.currentPassword,
            newPassword: req.body.newPassword,
          };
          const { error } = changePasswordValidation(newDetails);
          if (error) {
            return res.json({ error: error.details[0].message });
          }
          const validate = await user.matchPassword(newDetails.currentPassword);
          if (!validate) {
            return res.json({ error: "password does not match record" });
          }
          user.password = req.body.newPassword;
          const newUser = await user.save();
          return res
            .status(200)
            .json({ msg: "password changed succesfully", data: newUser });
        } catch (error) {
          res.status(500).json({ error: "server error" });
          console.log(error);
        }
    }

    async deleteUser(req, res) {
        const id = req.user._id;
        try {
          const user = await User.findById({ _id: id });
          if (!user) {
            req.flash("forgotpassMessage", "user not authorized");
            return res.status(403).json({ msg: "user not authorized" });
          }
          const newDetails = {
            email: req.body.email,
            password: req.body.password,
          };
      
          const validate = await user.matchPassword(newDetails.password);
          console.log(validate);
          if (!validate) {
            req.flash("forgotpassMessage", "password does not match record");
            return res.redirect("/users/delete");
            // return res.json({ msg: "password does not match record" });
          }
          user.remove({ _id: id }, function (err) {
            if (err) res.json(err);
            else req.flash("welcomeMessage", "user deleted successfully");
            return res.redirect("/users/login");
          });
      
          // return res.json(newUser);
        } catch (error) {
          res.status(500).json({ error: "server error" });
          console.log(error);
        }
    }

    async sendResetEmail(req, res) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.json({ error: "no user with that email" });
        }
        const resetToken = user.getResetPasswordToken();
        console.log(resetToken);
        console.log(user);
        await user.save({
          validateBeforeSave: false,
        });
        // await user.save();
      
        //create reset url
        // const resetUrl = `${req.protocol}://${req.get(
        //   "host"
        // )}/auth/resetpassword/${resetToken}`;
        const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;
        console.log(resetUrl);
        const message = `you are receiving this email cux you requsted for a forgot password: \n\n   ${resetUrl}`;
      
        try {
          await sendEmail(
            user.email,
            "Password Reset Request",
            {
              name: user.name,
              link: resetUrl,
            },
            "../config/templates/emailMessage.ejs"
          );
          return res.json({ msg: "Email sent successfully, check your ibox" });
        } catch (error) {
          console.log(error);
          (user.resetPasswordToken = undefined),
            (user.resetPasswordExpire = undefined);
          await user.save({ validateBeforeSave: false });
      
          return res.json({
            error:
              "cant send email at the moment make sure are connected to the intenet ",
          });
        }
    }

    async getResetPassPage(req, res) {
        const resetPasswordToken = crypto
          .createHash("sha256")
          .update(req.params.resetToken)
          .digest("hex");

        try {
          const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
          });

          res.render("resetPassword", {
            message: req.flash("resetPassMessage"),
            user: user,
            resetPasswordToken,
          });

        } catch (error) {
          req.flash("resetPassMessage", "'server error");
          console.log(error);
        }
    }

    async updatePasswordWithToken(req, res) {
        try {
          const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");
          // const user = await User.findOne({
          //   resetPasswordToken,
          //   resetPasswordExpire: { $gt: Date.now() },
          const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
          });
      
          if (!user) {
            return res.status(400).send("invalid token");
          }
      
          const { error } = resetPasswordValidation(req.body);
          if (error) {
            return res.status(400).json(error.details[0].message);
          }
          //set the new password
          user.password = req.body.password;
          
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
      
          await user.save();
          return sendTokenResponse(user, 200, res);

        } catch (error) {
          res.status(500).json({
            error: "Message Error",
          });
        }
      }

      async loginWithGithub(req, res) {
        await res.redirect('http://localhost:3000');
      }
}

module.exports = new AuthController();