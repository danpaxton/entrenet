const express = require("express");
const dbo = require("../db/conn");
const resourceRoutes = express.Router();
 
// Fetch all resources.
resourceRoutes.route("/resources").get((req, res) => {
 let db_connect = dbo.getDb();
 db_connect
   .collection("resources")
   .find({})
   .toArray()
   .then(data => {
     res.json(data);
   });
});

// Add a resource.
resourceRoutes.route("/resource/add").post((req, res) => {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    data: req.body.data, 
    likes: req.body.likes, 
    views: req.body.views, 
    date: req.body.date
  };
  db_connect
    .collection("resources")
    .insertOne(myobj)
    .then(data => {
      res.json(data);
  })
});

resourceRoutes.route("/resource/update").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { title: req.body.title };
  let newvalues = {
    $set: { data: req.body.data },
  };
  db_connect
    .collection("resources")
    .updateOne(myquery, newvalues)
    .then(data => {
      res.json(data);
    });
 });

resourceRoutes.route("/resource/delete").post((req, res) => {
 let db_connect = dbo.getDb();
 let myquery = { title: req.body.title };
 db_connect
  .collection("resources")
  .deleteOne(myquery)
  .then(data => {
      res.json(data);
  });
});
 
module.exports = resourceRoutes;