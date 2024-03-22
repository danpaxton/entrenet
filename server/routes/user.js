const dbo = require("../db/conn");
const userRoutes = require("express").Router();
const jwt = require("jsonwebtoken")
const { ObjectId } =  require("mongodb");
const bcrypt = require("bcrypt")

const { createSecretToken } = require("../util/SecretToken");

userRoutes.route("/signup").post(async (req, res) => {
 let db_connect = dbo.getDb();
 let myquery = { email : req.body.email };
 db_connect
   .collection("users")
   .findOne(myquery)
   .then(async found => {
     if (found) {
       return res.json({ message: "User already exists.", success: false });
     }
     let newvalues = {
        admin: true,
        logged: true,
        email: req.body.email,
        first: req.body.first,
        last: req.body.last,
        bookmarks: [],
        password: await bcrypt.hash(req.body.password, 12)
     };
    db_connect
      .collection("users")
      .insertOne(newvalues)
      .then(data => {
        res.cookie("token", createSecretToken(data.insertedId), {
          withCredentials: true,
          httpOnly: false,
        });
        const user = {...newvalues, _id: data.insertedId };
        return res.json({ message: "User signed in successfully", success: true, user });
      });
    });
  });

userRoutes.route("/login").post(async (req, res) => {
  let db_connect = dbo.getDb();
  let { email, password } = req.body;
  db_connect
    .collection('users')
    .findOne({ email })
    .then(async user => {
      if (!user) {
        return res.json({ message: 'Incorrect email', success: false});
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({ message: 'Incorrect password', success: false});
      }
      res.cookie("token", createSecretToken(user._id), {
        withCredentials: true,
        httpOnly: false,
      });
      return res.json({ message: "User logged in succesfully", success: true, user });
    });
});

userRoutes.route("/").get(async (req, res) => {
  let db_connect = dbo.getDb();
  let token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      db_connect
        .collection('users')
        .findOne({ _id : new ObjectId(data.id)})
        .then(user => {
          if (user) {
            return res.json({ status: true, user });
          } else {
            return res.json({ status: false });
          }
      });
    }
  });
});
module.exports = userRoutes;  