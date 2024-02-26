const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const resourceRoutes = express.Router();
 
 
resourceRoutes.route("/resources").get((req, res) => {
 let db_connect = dbo.getDb("users");
 db_connect
   .collection("resources")
   .find({})
   .toArray((err, result) => {
     if (err) throw err;
     res.json(result);
   });
});
 
resourceRoutes.route("/resource/:id").get((req, res) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("resources")
   .findOne(myquery, (err, result) => {
     if (err) throw err;
     console.log(res, result)
     res.json(result);
   });
});
 
resourceRoutes.route("/resource/add").post((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    data: req.body.data, 
    likes: req.body.likes, 
    views: req.body.views, 
    date: req.body.date
  };
  db_connect.collection("resources").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});
 
resourceRoutes.route("/update/:id").post((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
      title: req.body.title,
      data: req.body.data, 
      likes: req.body.likes, 
      views: req.body.views, 
      date: req.body.date
   },
 };
 db_connect
   .collection("resources")
   .updateOne(myquery, newvalues, (err, res) => {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
resourceRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("resources").deleteOne(myquery, (err, obj) => {
   if (err) throw err;
   console.log("1 resource deleted");
   response.json(obj);
 });
});
 
module.exports = resourceRoutes;