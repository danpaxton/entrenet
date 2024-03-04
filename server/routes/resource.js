const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
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
    .toArray()
    .then(data => {
      res.json(data);
  })
});

/* Update a resource.
resourceRoutes.route("/update/:id").post((req, response) => {
 let db_connect = dbo.getDb("users");
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
*/

/* Delete a resource.
resourceRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("resources").deleteOne(myquery, (err, obj) => {
   if (err) throw err;
   console.log("1 resource deleted");
   response.json(obj);
 });
});
*/
 
module.exports = resourceRoutes;