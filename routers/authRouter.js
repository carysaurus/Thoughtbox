// routers/authRouter.js

// --------------------------------------
// Variables
// --------------------------------------
const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const crypto = require("crypto");

// --------------------------------------
// Create New Local Strategy
// --------------------------------------
passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return callback(null, false, {
          message: "Incorrect username or password.",
        });
      }
      crypto.pbkdf2(
        password,
        Buffer.from(user.passwordSalt, "base64"),
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return callback(err);
          }
          if (
            !crypto.timingSafeEqual(
              Buffer.from(user.hashedPassword, "base64"),
              hashedPassword,
            )
          ) {
            return callback(null, false, {
              message: "Incorrect username or password. ",
            });
          }
          return callback(null, user);
        },
      );
    } catch (err) {
      return callback(err);
    }
  }),
);

// Tell Passport how to store the user in the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Tell Passport how to turn that ID back into a full user object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// --------------------------------------
// Login Existing User
// --------------------------------------

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Login error:", err);
      return res.redirect("/");
    }

    if (!user) {
      req.session.toastMessage = "loginFail";
      return res.redirect("/");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login after authentication failed:", err);
        return res.redirect("/");
      }
      if (req.session.toastMessage !== "registerSuccess")
        req.session.toastMessage = "loginSuccess";
      return res.redirect("/");
    });
  })(req, res);
});

// --------------------------------------
// Register New User
// --------------------------------------
router.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    console.error("Username and password are required");
    return res.redirect("/");
  }
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    console.error("Username already exists. Please choose another username.");
    req.session.toastMessage = "registerFail";
    return res.redirect("/");
  }

  // Create Salt
  const salt = crypto.randomBytes(12);

  // Hash password
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        console.error("Error while encrypting password");
        return res.redirect("/");
      }

      // Create new User in database
      try {
        const newUser = await User.create({
          username: req.body.username,
          hashedPassword: hashedPassword.toString("base64"),
          passwordSalt: salt.toString("base64"),
        });

        // Log user in immediately after registration
        req.login(newUser, function (err) {
          if (err) {
            console.error("Login after registration failed:", err);
            return res.redirect("/");
          }
          req.session.toastMessage = "registerSuccess";
          return res.redirect("/");
        });
      } catch (err) {
        console.error("Error creating new User:", err);
        return res.status(500).send("Failed to create new User");
      }
    },
  );
});

// --------------------------------------
// Logout User
// --------------------------------------
router.post("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/");
    }
    req.session.toastMessage = "logout";
    res.redirect("/");
  });
});

module.exports = router;
