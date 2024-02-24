const express = require("express");
 
// resourceRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const resourceRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the resources.
resourceRoutes.route("/resource").get(function (req, res) {
 let db_connect = dbo.getDb("resources");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
resourceRoutes.route("/resource/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("resources")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
resourceRoutes.route("/resource/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   title: req.body.title,
   desc: req.body.desc,
   data: req.body.data,
 };
 db_connect.collection("resources").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
resourceRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     title: req.body.title,
     desc: req.body.desc,
     data: req.body.data,
   },
 };
 db_connect
   .collection("resources")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
resourceRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("resources").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 resource deleted");
   response.json(obj);
 });
});
 
module.exports = resourceRoutes;